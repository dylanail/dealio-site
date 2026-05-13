import { promises as fs } from "fs";
import path from "path";

// Durable opt-in / opt-out audit log. Every consent action — pending,
// confirmed, opted-out, helped, honeypot-tripped — appends one JSON line to
// the log so records can be produced on demand during a TCPA / 10DLC audit.
//
// Sinks (writes are attempted in this order; success of at least one is
// required, otherwise the caller MUST surface an error to the user):
//   1. OPT_IN_WEBHOOK_URL — POST {Authorization: Bearer ${OPT_IN_WEBHOOK_TOKEN}}.
//      In production this is the canonical sink (Postgres, S3, BigQuery,
//      etc.) — most serverless runtimes have ephemeral filesystems, so
//      relying on FS alone is unsafe.
//   2. OPT_IN_LOG_PATH file (or ./.opt-in-records.jsonl as a dev fallback).
//      Best-effort: failures are logged but do not fail the request when at
//      least one sink succeeded.

export type ConsentEventKind =
  | "pending" //  user submitted the form; awaiting YES verification
  | "confirmed" // user replied YES; enrolled in the program
  | "opted_out" // user replied STOP (or equivalent)
  | "resubscribed" // previously opted-out user replied START
  | "help_requested" // user replied HELP / INFO
  | "honeypot_tripped" // form honeypot field was non-empty
  | "rate_limited"; // IP or phone hit the rate limit

export type OptInRecord = {
  kind: ConsentEventKind;
  name: string | null;
  phone: string;
  email: string | null;
  company: string | null;
  consentText: string | null;
  consentVersion: string | null;
  clientConsentVersion: string | null;
  consentTimestamp: string | null;
  pageUrl: string | null;
  userAgent: string | null;
  ip: string | null;
  receivedAt: string;
  twilioMessageSid: string | null;
  twilioMessageStatus: "sent" | "skipped" | "failed" | null;
  inboundBody: string | null;
  inboundMessageSid: string | null;
};

const resolveLogPath = () => {
  const fromEnv = process.env.OPT_IN_LOG_PATH;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return path.join(process.cwd(), ".opt-in-records.jsonl");
};

const isAllowedWebhookUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    // Block obvious metadata / loopback endpoints to mitigate SSRF if the
    // env var is ever sourced from an untrusted location.
    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "169.254.169.254" ||
      host.endsWith(".internal")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const writeWebhook = async (line: string): Promise<boolean> => {
  const webhook = process.env.OPT_IN_WEBHOOK_URL;
  if (!webhook || webhook.trim().length === 0) return false;
  if (!isAllowedWebhookUrl(webhook)) {
    console.error("[sms-opt-in] webhook URL rejected (non-https/blocked host)");
    return false;
  }
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.OPT_IN_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.OPT_IN_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: line,
    });
    return res.ok;
  } catch (err) {
    console.error("[sms-opt-in] webhook delivery failed", err);
    return false;
  }
};

const writeFile = async (line: string): Promise<boolean> => {
  try {
    const target = resolveLogPath();
    await fs.mkdir(path.dirname(target), { recursive: true }).catch(() => {});
    await fs.appendFile(target, line, { encoding: "utf8", mode: 0o640 });
    return true;
  } catch (err) {
    console.error("[sms-opt-in] filesystem persistence failed", err);
    return false;
  }
};

const isProd = process.env.NODE_ENV === "production";

export const persistConsentEvent = async (
  record: OptInRecord,
): Promise<void> => {
  const line = JSON.stringify(record) + "\n";
  const webhookOk = await writeWebhook(line);
  const fileOk = await writeFile(line);

  if (!webhookOk && !fileOk) {
    // Neither sink succeeded — refuse to silently lose the consent record.
    throw new Error(
      "[sms-opt-in] no durable sink available; OPT_IN_WEBHOOK_URL and the " +
        "filesystem both failed. Refusing to acknowledge the opt-in.",
    );
  }

  if (isProd && !webhookOk) {
    // In production, FS writes on serverless are ephemeral or read-only.
    // Loudly warn so operators know they're relying on a non-durable sink.
    console.warn(
      "[sms-opt-in] webhook write failed in production; relying on local " +
        "filesystem which is likely ephemeral on this runtime.",
    );
  }
};

export const buildBaseRecord = (
  kind: ConsentEventKind,
  partial: Partial<OptInRecord> & { phone: string },
): OptInRecord => ({
  kind,
  name: partial.name ?? null,
  phone: partial.phone,
  email: partial.email ?? null,
  company: partial.company ?? null,
  consentText: partial.consentText ?? null,
  consentVersion: partial.consentVersion ?? null,
  clientConsentVersion: partial.clientConsentVersion ?? null,
  consentTimestamp: partial.consentTimestamp ?? null,
  pageUrl: partial.pageUrl ?? null,
  userAgent: partial.userAgent ?? null,
  ip: partial.ip ?? null,
  receivedAt: new Date().toISOString(),
  twilioMessageSid: partial.twilioMessageSid ?? null,
  twilioMessageStatus: partial.twilioMessageStatus ?? null,
  inboundBody: partial.inboundBody ?? null,
  inboundMessageSid: partial.inboundMessageSid ?? null,
});
