import { NextResponse } from "next/server";

export const runtime = "nodejs";

// A2P 10DLC / TCPA compliance: every opt-in must be stored with the exact
// consent text shown, a timestamp, the source URL, and the user's identifying
// info. This endpoint validates and logs the record; replace the console.log
// with your real persistence layer (DB row, CRM contact, audit log, etc.)
// before going to production.

type OptInBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  consent?: unknown;
  consentText?: unknown;
  consentTimestamp?: unknown;
  pageUrl?: unknown;
  userAgent?: unknown;
};

const isString = (v: unknown): v is string => typeof v === "string";

export async function POST(req: Request) {
  let body: OptInBody;
  try {
    body = (await req.json()) as OptInBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = isString(body.name) ? body.name.trim() : "";
  const phone = isString(body.phone) ? body.phone.trim() : "";
  const consent = body.consent === true;
  const consentText = isString(body.consentText) ? body.consentText.trim() : "";

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 },
    );
  }

  // Expect E.164 US format from the client (+1XXXXXXXXXX).
  if (!/^\+1\d{10}$/.test(phone)) {
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

  if (consentText.length < 40) {
    return NextResponse.json(
      { error: "Missing consent disclosure." },
      { status: 400 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  const record = {
    name,
    phone,
    email: isString(body.email) ? body.email.trim() || null : null,
    company: isString(body.company) ? body.company.trim() || null : null,
    consent: true,
    consentText,
    consentTimestamp: isString(body.consentTimestamp)
      ? body.consentTimestamp
      : new Date().toISOString(),
    pageUrl: isString(body.pageUrl) ? body.pageUrl : null,
    userAgent: isString(body.userAgent) ? body.userAgent : null,
    ip,
    receivedAt: new Date().toISOString(),
  };

  // TODO(prod): persist `record` to your durable store of choice so it can be
  // produced on demand during a carrier / 10DLC audit. For now we log a
  // single-line JSON entry to stdout — easy to grep, easy to ship to Datadog.
  console.log("[sms-opt-in]", JSON.stringify(record));

  return NextResponse.json({ ok: true });
}
