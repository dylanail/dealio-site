import { NextResponse } from "next/server";
import {
  isHelpKeyword,
  isStartKeyword,
  isStopKeyword,
} from "@/lib/sms-consent";
import {
  buildBaseRecord,
  persistConsentEvent,
} from "@/lib/opt-in-store";
import {
  sendHelpSms,
  sendOptOutSms,
  sendResubscribeSms,
  sendWelcomeSms,
  verifyTwilioSignature,
} from "@/lib/twilio";

export const runtime = "nodejs";

// Twilio inbound-SMS webhook. Handles the keywords every A2P 10DLC campaign
// is required to honor:
//   STOP / STOPALL / UNSUBSCRIBE / CANCEL / END / QUIT  -> opt the number out
//   HELP / INFO                                          -> reply with help
//   START / YES / UNSTOP                                 -> confirm (or rejoin)
//
// All inbound requests must carry a valid X-Twilio-Signature; we verify with
// HMAC-SHA1 of (publicUrl + sortedParams) using the account auth token, so
// an attacker can't forge "STOP" messages for arbitrary numbers.

const publicUrl = (req: Request): string => {
  // Prefer an explicitly configured URL — Twilio computes its signature
  // over the EXACT URL it POSTs to, which behind a proxy may differ from
  // req.url. Fall back to req.url for local dev.
  const configured = process.env.TWILIO_INBOUND_WEBHOOK_URL?.trim();
  if (configured && configured.length > 0) return configured;
  return req.url;
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const params: Record<string, string> = {};
  const search = new URLSearchParams(rawBody);
  for (const [k, v] of search.entries()) params[k] = v;

  const ok = verifyTwilioSignature({
    signatureHeader: req.headers.get("x-twilio-signature"),
    url: publicUrl(req),
    params,
  });
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid Twilio signature." },
      { status: 403 },
    );
  }

  const from = params["From"] ?? "";
  const body = params["Body"] ?? "";
  const inboundSid = params["MessageSid"] ?? null;

  if (!/^\+1\d{10}$/.test(from)) {
    return new NextResponse("<Response/>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }

  if (isStopKeyword(body)) {
    await persistConsentEvent(
      buildBaseRecord("opted_out", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
      }),
    );
    const sms = await sendOptOutSms(from);
    await persistConsentEvent(
      buildBaseRecord("opted_out", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
        twilioMessageSid: sms.status === "sent" ? sms.sid : null,
        twilioMessageStatus: sms.status,
      }),
    );
  } else if (isHelpKeyword(body)) {
    await persistConsentEvent(
      buildBaseRecord("help_requested", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
      }),
    );
    const sms = await sendHelpSms(from);
    await persistConsentEvent(
      buildBaseRecord("help_requested", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
        twilioMessageSid: sms.status === "sent" ? sms.sid : null,
        twilioMessageStatus: sms.status,
      }),
    );
  } else if (isStartKeyword(body)) {
    // START / YES confirms a pending enrollment or rejoins after an
    // opt-out. From the user's perspective both cases produce a welcome
    // message; downstream consumers of the audit log can tell them apart
    // by the most recent non-pending record for this phone.
    await persistConsentEvent(
      buildBaseRecord("confirmed", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
      }),
    );
    const isResubscribe = body.trim().toUpperCase().startsWith("START");
    const sms = isResubscribe
      ? await sendResubscribeSms(from)
      : await sendWelcomeSms(from);
    await persistConsentEvent(
      buildBaseRecord(isResubscribe ? "resubscribed" : "confirmed", {
        phone: from,
        inboundBody: body,
        inboundMessageSid: inboundSid,
        twilioMessageSid: sms.status === "sent" ? sms.sid : null,
        twilioMessageStatus: sms.status,
      }),
    );
  }

  // Return an empty TwiML response — we send replies via the REST API
  // (above) so we can capture each SID in the audit log.
  return new NextResponse("<Response/>", {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}
