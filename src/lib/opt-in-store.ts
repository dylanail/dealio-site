import { promises as fs } from "fs";
import path from "path";

// Durable opt-in audit log. Writes one JSON record per line to a file so
// records can be produced on demand during a TCPA / 10DLC carrier audit.
//
// Resolution order:
//   1. OPT_IN_LOG_PATH env var (recommended in production — point at a
//      volume that is backed up and retained for ≥5 years).
//   2. ./.opt-in-records.jsonl in the project root (dev fallback).
//
// In addition, if OPT_IN_WEBHOOK_URL is set, every record is POSTed to that
// URL so it can be fanned out to a CRM / Datadog / S3 from a single hook.

export type OptInRecord = {
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  consent: true;
  consentText: string;
  consentVersion: string;
  clientConsentVersion: string | null;
  consentTimestamp: string;
  pageUrl: string | null;
  userAgent: string | null;
  ip: string | null;
  receivedAt: string;
  confirmationSmsSid: string | null;
  confirmationSmsStatus: "sent" | "skipped" | "failed";
};

const resolveLogPath = () => {
  const fromEnv = process.env.OPT_IN_LOG_PATH;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return path.join(process.cwd(), ".opt-in-records.jsonl");
};

export const persistOptIn = async (record: OptInRecord): Promise<void> => {
  const target = resolveLogPath();
  const line = JSON.stringify(record) + "\n";

  await fs.mkdir(path.dirname(target), { recursive: true }).catch(() => {});
  await fs.appendFile(target, line, { encoding: "utf8", mode: 0o640 });

  const webhook = process.env.OPT_IN_WEBHOOK_URL;
  if (webhook && webhook.trim().length > 0) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.OPT_IN_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.OPT_IN_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: line,
      });
    } catch (err) {
      // Never fail the user-facing opt-in because a downstream sink is down —
      // the local JSONL is still the canonical audit record.
      console.error("[sms-opt-in] webhook delivery failed", err);
    }
  }
};
