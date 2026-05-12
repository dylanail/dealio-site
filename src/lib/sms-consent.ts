import { BUSINESS } from "./business";

// Versioned consent disclosure. Bump CONSENT_VERSION any time the wording
// below changes so we can prove, during a TCPA / A2P 10DLC audit, exactly
// which language an opter agreed to. Each persisted opt-in record stores
// this version string alongside the verbatim text.
export const CONSENT_VERSION = "2026-05-12.v2";

// Disclosed program frequency. Stated honestly: a small marketing cap PLUS
// transactional volume that scales with the operator's account activity.
// Mirrored in /opt-in, /sms-terms, and the consent text below.
export const FREQUENCY_DISCLOSURE =
  "Up to ~10 marketing messages per month plus transactional messages triggered by your account activity (for example, one text per lead delivered to your account). Frequency varies.";

// Canonical CTIA-compliant STOP keywords carriers expect us to honor.
export const STOP_KEYWORDS = [
  "STOP",
  "STOPALL",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
] as const;

// Canonical, server-pinned consent text. The form sends back the version it
// rendered; the server compares versions but stores ITS canonical copy in
// the audit record (never trusting what the client submitted).
export const CONSENT_TEXT = [
  `By checking this box and submitting this form, I expressly authorize ${BUSINESS.legalName} to send me recurring SMS text messages — including marketing messages — at the U.S. mobile number I provided, including messages sent using an automatic telephone dialing system (ATDS) or other automated technology.`,
  `Messages may include lead-program updates, onboarding instructions, account and billing notices, and offers. Up to ~10 marketing messages per month plus transactional messages triggered by my account activity; frequency varies.`,
  `I confirm that I am at least 18 years old, that the mobile number provided is mine (or that I am authorized to enroll it), and that I understand consent to receive marketing texts is NOT required as a condition of purchasing any goods or services.`,
  `Message and data rates may apply. I can reply STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, or QUIT at any time to opt out, or HELP for help. I have read and agree to Dealio's SMS Terms and Privacy Policy.`,
].join(" ");
