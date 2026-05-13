// Twilio integration. Node-runtime only (uses Buffer and crypto). The opt-in
// API route declares `runtime = "nodejs"` so this is safe.
//
// Outbound:
//  - sendVerificationSms  — initial double-opt-in prompt ("Reply YES to confirm")
//  - sendWelcomeSms       — sent only AFTER the user replies YES
//  - sendOptOutSms        — final confirmation after STOP
//  - sendHelpSms          — response to HELP / INFO
//  - sendResubscribeSms   — response to START from a previously opted-out user
//
// Inbound:
//  - verifyTwilioSignature — HMAC-SHA1 verification of X-Twilio-Signature

import crypto from "crypto";
import { BUSINESS } from "./business";

type SendResult =
  | { status: "sent"; sid: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

const credentials = () => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return null;
  return { sid, token, from };
};

const postMessage = async (toE164: string, body: string): Promise<SendResult> => {
  const creds = credentials();
  if (!creds) {
    return { status: "skipped", reason: "twilio credentials not configured" };
  }

  const params = new URLSearchParams({
    To: toE164,
    From: creds.from,
    Body: body,
  });
  const auth = Buffer.from(`${creds.sid}:${creds.token}`).toString("base64");

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(
        creds.sid,
      )}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        status: "failed",
        reason: `twilio ${res.status}: ${text.slice(0, 200)}`,
      };
    }
    const json = (await res.json().catch(() => null)) as
      | { sid?: string }
      | null;
    return { status: "sent", sid: json?.sid ?? "unknown" };
  } catch (err) {
    return {
      status: "failed",
      reason: err instanceof Error ? err.message : "unknown twilio error",
    };
  }
};

// All message bodies are deliberately kept inside a single SMS segment
// (≤160 GSM-7 chars) so we don't burn carrier budget on welcome traffic.

const VERIFICATION_BODY =
  `${BUSINESS.brandName}: Reply YES to confirm Dealio Leads ` +
  `(~10 mktg msgs/mo + transactional). Msg&data rates apply. ` +
  `HELP for help, STOP to cancel.`;

const WELCOME_BODY =
  `${BUSINESS.brandName}: You're enrolled in Dealio Leads. ` +
  `~10 mktg msgs/mo + transactional. Msg&data rates apply. ` +
  `HELP for help, STOP to cancel.`;

const OPT_OUT_BODY =
  `${BUSINESS.brandName}: You're unsubscribed from Dealio Leads. ` +
  `No more msgs will be sent. Reply START to rejoin.`;

const RESUBSCRIBE_BODY =
  `${BUSINESS.brandName}: Welcome back to Dealio Leads. ` +
  `~10 mktg msgs/mo + transactional. Msg&data rates apply. ` +
  `HELP for help, STOP to cancel.`;

const helpBody = () =>
  `${BUSINESS.brandName} Leads support: ${BUSINESS.supportEmail}. ` +
  `~10 mktg msgs/mo + transactional. Msg&data rates apply. ` +
  `Reply STOP to cancel.`;

export const sendVerificationSms = (toE164: string) =>
  postMessage(toE164, VERIFICATION_BODY);

export const sendWelcomeSms = (toE164: string) =>
  postMessage(toE164, WELCOME_BODY);

export const sendOptOutSms = (toE164: string) =>
  postMessage(toE164, OPT_OUT_BODY);

export const sendResubscribeSms = (toE164: string) =>
  postMessage(toE164, RESUBSCRIBE_BODY);

export const sendHelpSms = (toE164: string) => postMessage(toE164, helpBody());

// Twilio computes X-Twilio-Signature as base64(HMAC-SHA1(authToken,
// fullUrl + concat(sortedFormParams))). We replicate that verification here
// so an attacker can't POST forged "STOP" messages to /api/sms-inbound and
// trigger opt-outs for arbitrary numbers.
export const verifyTwilioSignature = (args: {
  signatureHeader: string | null;
  url: string;
  params: Record<string, string>;
}): boolean => {
  const creds = credentials();
  if (!creds) {
    // No credentials configured — reject by default; we never want to
    // process inbound webhooks without verification.
    return false;
  }
  if (!args.signatureHeader) return false;

  const sortedKeys = Object.keys(args.params).sort();
  let data = args.url;
  for (const k of sortedKeys) {
    data += k + args.params[k];
  }

  const expected = crypto
    .createHmac("sha1", creds.token)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");

  // Constant-time comparison to resist timing attacks.
  const a = Buffer.from(expected);
  const b = Buffer.from(args.signatureHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};
