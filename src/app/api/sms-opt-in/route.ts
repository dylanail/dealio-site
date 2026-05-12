import { NextResponse } from "next/server";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/sms-consent";
import { persistOptIn, type OptInRecord } from "@/lib/opt-in-store";
import { sendWelcomeSms } from "@/lib/twilio";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// A2P 10DLC / TCPA compliance endpoint. Every successful POST results in a
// durable audit record (see opt-in-store.ts) containing the verbatim consent
// text the user agreed to, a version stamp, the timestamp, the source URL,
// IP, and user agent. A confirmation/welcome SMS is dispatched via Twilio
// when credentials are configured.

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
  pageUrl?: unknown;
  userAgent?: unknown;
  // Honeypot field — must be empty / absent for real submissions.
  website?: unknown;
};

const isString = (v: unknown): v is string => typeof v === "string";

const allowedOrigin = (req: Request): boolean => {
  // Same-origin POSTs from the browser will include Origin. Reject anything
  // that doesn't match the deployed site host. In dev/preview, the
  // ALLOWED_ORIGIN env can supply a comma-separated allow-list.
  const origin = req.headers.get("origin");
  if (!origin) return true; // server-to-server (e.g., curl) — fine, still rate-limited
  const host = req.headers.get("host");
  if (host && origin.endsWith(`//${host}`)) return true;
  const extra = process.env.ALLOWED_ORIGIN?.split(",").map((s) => s.trim()) ?? [];
  return extra.includes(origin);
};

export async function POST(req: Request) {
  if (!allowedOrigin(req)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = checkRateLimit(`opt-in:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: OptInBody;
  try {
    body = (await req.json()) as OptInBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Respond with a 200
  // so bots can't infer that they tripped the trap.
  if (isString(body.website) && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = isString(body.name) ? body.name.trim() : "";
  const phone = isString(body.phone) ? body.phone.trim() : "";
  const consent = body.consent === true;
  const ageConfirmed = body.ageConfirmed === true;
  const subscriberConfirmed = body.subscriberConfirmed === true;

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  // Expect E.164 US format from the client (+1XXXXXXXXXX). Reject
  // obviously-invalid numbers (e.g., leading 0/1 in the area code).
  if (!/^\+1[2-9]\d{2}[2-9]\d{6}$/.test(phone)) {
    return NextResponse.json(
      { error: "Please provide a valid 10-digit US mobile number." },
      { status: 400 },
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "You must agree to receive SMS messages." },
      { status: 400 },
    );
  }

  if (!ageConfirmed || !subscriberConfirmed) {
    return NextResponse.json(
      {
        error:
          "You must confirm you are 18+ and that the mobile number provided is yours.",
      },
      { status: 400 },
    );
  }

  const clientConsentVersion = isString(body.consentVersion)
    ? body.consentVersion
    : null;

  const email = isString(body.email) ? body.email.trim() : "";
  if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const sms = await sendWelcomeSms(phone);

  const record: OptInRecord = {
    name,
    phone,
    email: email.length > 0 ? email : null,
    company: isString(body.company) ? body.company.trim() || null : null,
    consent: true,
    // Server-pinned canonical text — we never trust the client copy for the
    // audit record. Client may still send its version string so we can
    // detect drift.
    consentText: CONSENT_TEXT,
    consentVersion: CONSENT_VERSION,
    clientConsentVersion,
    consentTimestamp: isString(body.consentTimestamp)
      ? body.consentTimestamp
      : new Date().toISOString(),
    pageUrl: isString(body.pageUrl) ? body.pageUrl : null,
    userAgent: isString(body.userAgent) ? body.userAgent : null,
    ip: ip === "unknown" ? null : ip,
    receivedAt: new Date().toISOString(),
    confirmationSmsSid: sms.status === "sent" ? sms.sid : null,
    confirmationSmsStatus: sms.status,
  };

  try {
    await persistOptIn(record);
  } catch (err) {
    console.error("[sms-opt-in] persistence failed", err);
    return NextResponse.json(
      { error: "We couldn't record your opt-in. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    confirmationSmsStatus: sms.status,
  });
}
