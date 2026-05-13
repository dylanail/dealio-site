import { NextResponse } from "next/server";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/sms-consent";
import {
  buildBaseRecord,
  persistConsentEvent,
  type OptInRecord,
} from "@/lib/opt-in-store";
import { sendVerificationSms } from "@/lib/twilio";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// A2P 10DLC / TCPA compliance endpoint — step 1 of a verified double opt-in.
//
// Flow:
//   1. Validate the form, persist a "pending" consent record (canonical
//      consent text + version, server-derived Referer / UA / IP, attestations).
//   2. Send a verification SMS asking the user to reply YES.
//   3. The user's YES reply flips the record to "confirmed" via
//      /api/sms-inbound. Until then, NO marketing traffic is sent.

type OptInBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  consent?: unknown;
  ageConfirmed?: unknown;
  subscriberConfirmed?: unknown;
  consentVersion?: unknown;
  consentTimestamp?: unknown;
  website?: unknown; // honeypot
};

const isString = (v: unknown): v is string => typeof v === "string";

// NANP N11 codes reserved for special services — not valid area codes.
const N11_BLOCKED = new Set([
  "211",
  "311",
  "411",
  "511",
  "611",
  "711",
  "811",
  "911",
]);

const validUsMobile = (phone: string): boolean => {
  if (!/^\+1[2-9]\d{2}[2-9]\d{6}$/.test(phone)) return false;
  const areaCode = phone.slice(2, 5);
  if (N11_BLOCKED.has(areaCode)) return false;
  // 555 line range (555-0100 to 555-0199) is reserved fictional.
  if (phone.slice(5, 8) === "555") {
    const line = parseInt(phone.slice(8, 12), 10);
    if (line >= 100 && line <= 199) return false;
  }
  return true;
};

const allowedOrigin = (req: Request): boolean => {
  // Require the Origin header on every request — we never accept the
  // "missing Origin = trusted" pattern, because non-browser clients (curl,
  // scripted bots) trivially omit it.
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("host");
  if (host && origin.endsWith(`//${host}`)) return true;
  const extra =
    process.env.ALLOWED_ORIGIN?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  return extra.includes(origin);
};

const extractIp = (req: Request): string | null => {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  return real ?? null;
};

const j = (body: unknown, init?: ResponseInit) => NextResponse.json(body, init);

export async function POST(req: Request) {
  if (!allowedOrigin(req)) {
    return j({ error: "Origin not allowed" }, { status: 403 });
  }

  const ip = extractIp(req);
  const ipKey = ip ?? "unknown";

  const rlIp = checkRateLimit(`opt-in:ip:${ipKey}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!rlIp.ok) {
    return j(
      { error: "Too many requests. Try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rlIp.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: OptInBody;
  try {
    body = (await req.json()) as OptInBody;
  } catch {
    return j({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Server-trusted context — never read from the client body.
  const referer = req.headers.get("referer");
  const userAgent = req.headers.get("user-agent");

  // Honeypot trap. Real users shouldn't fill the hidden `website` field; if
  // it's non-empty we log the event (so support can investigate false
  // positives, e.g. autofill or assistive tech) and return 200 to avoid
  // tipping off bots.
  if (isString(body.website) && body.website.trim().length > 0) {
    await persistConsentEvent(
      buildBaseRecord("honeypot_tripped", {
        phone: isString(body.phone) ? body.phone.trim() : "unknown",
        name: isString(body.name) ? body.name.trim() : null,
        email: isString(body.email) ? body.email.trim() || null : null,
        company: isString(body.company) ? body.company.trim() || null : null,
        pageUrl: referer,
        userAgent,
        ip,
      }),
    ).catch(() => {});
    return j({ ok: true, status: "pending_confirmation" });
  }

  const name = isString(body.name) ? body.name.trim() : "";
  const phone = isString(body.phone) ? body.phone.trim() : "";
  const consent = body.consent === true;
  const ageConfirmed = body.ageConfirmed === true;
  const subscriberConfirmed = body.subscriberConfirmed === true;

  if (name.length < 2) {
    return j({ error: "Name is required." }, { status: 400 });
  }

  if (!validUsMobile(phone)) {
    return j(
      { error: "Please provide a valid 10-digit US mobile number." },
      { status: 400 },
    );
  }

  if (!consent) {
    return j(
      { error: "You must agree to receive SMS messages." },
      { status: 400 },
    );
  }

  if (!ageConfirmed || !subscriberConfirmed) {
    return j(
      {
        error:
          "You must confirm you are 18+ and that the mobile number provided is yours.",
      },
      { status: 400 },
    );
  }

  // Per-phone rate limit: don't send a fresh verification SMS more than
  // once per minute to the same number. Defends against form-spam-driven
  // SMS pumping.
  const rlPhone = checkRateLimit(`opt-in:phone:${phone}`, {
    limit: 1,
    windowMs: 60_000,
  });
  if (!rlPhone.ok) {
    return j(
      {
        error:
          "We just sent a verification text to this number. Wait a minute before trying again.",
      },
      { status: 429 },
    );
  }

  const email = isString(body.email) ? body.email.trim() : "";
  if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return j(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const clientConsentVersion = isString(body.consentVersion)
    ? body.consentVersion
    : null;

  // 1. Persist the pending record BEFORE attempting to dispatch the SMS.
  //    If persistence fails, the user is told to retry; no Twilio message
  //    is ever sent without a stored consent receipt.
  const pendingRecord: OptInRecord = buildBaseRecord("pending", {
    name,
    phone,
    email: email.length > 0 ? email : null,
    company: isString(body.company) ? body.company.trim() || null : null,
    consentText: CONSENT_TEXT,
    consentVersion: CONSENT_VERSION,
    clientConsentVersion,
    consentTimestamp: isString(body.consentTimestamp)
      ? body.consentTimestamp
      : new Date().toISOString(),
    pageUrl: referer,
    userAgent,
    ip,
  });

  try {
    await persistConsentEvent(pendingRecord);
  } catch (err) {
    console.error("[sms-opt-in] pending persistence failed", err);
    return j(
      { error: "We couldn't record your opt-in. Please try again." },
      { status: 500 },
    );
  }

  // 2. Now dispatch the verification SMS. If Twilio fails, we still have a
  //    pending record and surface the failure to the user.
  const sms = await sendVerificationSms(phone);

  try {
    await persistConsentEvent({
      ...pendingRecord,
      kind: "pending",
      twilioMessageSid: sms.status === "sent" ? sms.sid : null,
      twilioMessageStatus: sms.status,
      receivedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[sms-opt-in] sms-status persistence failed", err);
  }

  if (sms.status === "failed") {
    return j(
      {
        error:
          "We couldn't send the verification text. Check the number and try again.",
      },
      { status: 502 },
    );
  }

  return j({
    ok: true,
    status: "pending_confirmation",
    verificationSmsStatus: sms.status,
  });
}
