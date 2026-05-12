import { BUSINESS } from "./business";

// Sends the CTIA-mandated welcome / confirmation message after a successful
// opt-in. We use a direct REST call (no SDK dependency) so this works in any
// Next.js runtime that has fetch.
//
// If TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER are not all
// set, the function no-ops and returns "skipped" — the opt-in still persists
// to the audit log so a human can backfill the welcome message.

type SendResult =
  | { status: "sent"; sid: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

const buildWelcomeBody = () =>
  [
    `${BUSINESS.brandName}: You're enrolled in Dealio Leads.`,
    `Up to ~10 marketing msgs/mo + transactional msgs triggered by your account.`,
    `Msg & data rates may apply.`,
    `Reply HELP for help, STOP to cancel.`,
    `Terms: ${BUSINESS.websiteUrl}/sms-terms`,
  ].join(" ");

export const sendWelcomeSms = async (toE164: string): Promise<SendResult> => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    return { status: "skipped", reason: "twilio credentials not configured" };
  }

  const body = buildWelcomeBody();
  const params = new URLSearchParams({ To: toE164, From: from, Body: body });
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(
        sid,
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
