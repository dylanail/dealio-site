import { BUSINESS } from "./business";

// Versioned consent disclosure. Bump CONSENT_VERSION any time the wording
// below changes so we can prove, during a TCPA / A2P 10DLC audit, exactly
// which language an opter agreed to. Each persisted opt-in record stores
// this version string alongside the verbatim text.
export const CONSENT_VERSION = "2026-05-12.v3";

// TCR campaign use-case classification for the Dealio Leads program.
// Documented here for the next reviewer; the actual registration lives in
// the TCR portal.
export const TCR_USE_CASE = "MIXED"; // marketing + account/transactional

// Disclosed program frequency. Stated honestly: a small marketing cap PLUS
// transactional volume that scales with the operator's account activity.
// Mirrored in /opt-in, /sms-terms, the welcome SMS, and the consent text.
export const FREQUENCY_DISCLOSURE =
  "Up to ~10 marketing messages per month plus transactional messages triggered by your account activity (for example, one text per lead delivered to your account). Frequency varies.";

// CTIA-compliant STOP keyword set. Honored by our /api/sms-inbound handler
// and by Twilio Messaging Service Advanced Opt-Out (configured in console).
export const STOP_KEYWORDS = [
  "STOP",
  "STOPALL",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
] as const;

// CTIA-compliant HELP keyword set.
export const HELP_KEYWORDS = ["HELP", "INFO"] as const;

// CTIA-compliant START / re-subscribe keyword set, also reused as the
// confirmation reply for our verified double opt-in flow.
export const START_KEYWORDS = ["START", "YES", "UNSTOP"] as const;

const allKeywords = (set: readonly string[], input: string) => {
  const normalized = input.trim().toUpperCase().replace(/[^A-Z]/g, "");
  return set.includes(normalized);
};

export const isStopKeyword = (body: string) => allKeywords(STOP_KEYWORDS, body);
export const isHelpKeyword = (body: string) => allKeywords(HELP_KEYWORDS, body);
export const isStartKeyword = (body: string) =>
  allKeywords(START_KEYWORDS, body);

// Canonical, server-pinned consent text. The form sends back the version it
// rendered; the server compares versions but stores ITS canonical copy in
// the audit record (never trusting what the client submitted).
export const CONSENT_TEXT = [
  `By checking these boxes and submitting this form, I expressly authorize ${BUSINESS.legalName} to send me recurring SMS text messages — including marketing messages — at the U.S. mobile number I provided, including messages sent using an automatic telephone dialing system (ATDS) or other automated technology.`,
  `Messages may include lead-program updates, onboarding instructions, account and billing notices, and offers. Up to ~10 marketing messages per month plus transactional messages triggered by my account activity; frequency varies.`,
  `I confirm that I am at least 18 years old, that the mobile number provided is mine (or that I am authorized to enroll it), and that I understand consent to receive marketing texts is NOT required as a condition of purchasing any goods or services.`,
  `I understand my enrollment is confirmed only after I reply YES to the verification text sent to my mobile number.`,
  `Message and data rates may apply. I can reply STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, or QUIT at any time to opt out, or HELP / INFO for help. I have read and agree to Dealio's SMS Terms and Privacy Policy.`,
].join(" ");
