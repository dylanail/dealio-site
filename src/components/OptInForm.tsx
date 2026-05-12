"use client";

import { useState } from "react";
import Link from "next/link";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "#fff",
  padding: "0 14px",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "var(--text-1)",
  outline: "none",
  transition: "border-color 160ms",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--text-2)",
  fontWeight: 500,
  marginBottom: 8,
  display: "block",
};

type Status = "idle" | "submitting" | "success" | "error";

const formatPhone = (raw: string) => {
  const digits = raw.replace(/[^\d]/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const OptInForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/[^\d]/g, "");
  const valid =
    name.trim().length >= 2 &&
    phoneDigits.length === 10 &&
    consent &&
    status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/sms-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: `+1${phoneDigits}`,
          email: email.trim() || null,
          company: company.trim() || null,
          consent: true,
          consentText: CONSENT_TEXT,
          consentTimestamp: new Date().toISOString(),
          pageUrl: typeof window !== "undefined" ? window.location.href : null,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "40px 32px",
          borderRadius: 18,
          border: "1px solid var(--success)",
          background: "var(--success-bg)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: "var(--success)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5 L10 17.5 L19 7.5"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 24,
            margin: "0 0 8px",
            color: "var(--ink)",
            letterSpacing: "-0.03em",
          }}
        >
          You&apos;re opted in.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: "24px",
            color: "var(--text-2)",
            margin: 0,
            maxWidth: 460,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We&apos;ve recorded your consent to receive SMS messages from Dealio at{" "}
          <strong style={{ color: "var(--ink)" }}>{formatPhone(phone)}</strong>.
          You can reply <code>STOP</code> at any time to opt out, or{" "}
          <code>HELP</code> for help.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brand-blue)",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div>
        <label htmlFor="optin-name" style={labelStyle}>
          Full name <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <input
          id="optin-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="optin-phone" style={labelStyle}>
          Mobile phone (US) <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <input
          id="optin-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          style={inputStyle}
          placeholder="(555) 123-4567"
          aria-describedby="phone-help"
        />
        <p
          id="phone-help"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-3)",
            margin: "6px 0 0",
          }}
        >
          US mobile numbers only. We&apos;ll send a confirmation text.
        </p>
      </div>

      <div className="grid-2">
        <div>
          <label htmlFor="optin-email" style={labelStyle}>
            Email (optional)
          </label>
          <input
            id="optin-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="optin-company" style={labelStyle}>
            Company (optional)
          </label>
          <input
            id="optin-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={inputStyle}
            placeholder="Acme Moving Co."
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 4,
          padding: "20px 22px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <input
          id="optin-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          style={{
            marginTop: 4,
            width: 18,
            height: 18,
            flexShrink: 0,
            accentColor: "var(--brand-blue)",
            cursor: "pointer",
          }}
        />
        <label
          htmlFor="optin-consent"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: "22px",
            color: "var(--text-1)",
            cursor: "pointer",
          }}
        >
          {CONSENT_TEXT_JSX}
        </label>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "var(--text-3)",
          margin: 0,
          lineHeight: "18px",
        }}
      >
        MSG &amp; DATA RATES MAY APPLY · MSG FREQUENCY VARIES (UP TO ~4/MONTH) ·
        REPLY <strong style={{ color: "var(--text-2)" }}>STOP</strong> TO
        CANCEL, <strong style={{ color: "var(--text-2)" }}>HELP</strong> FOR
        HELP · CARRIERS ARE NOT LIABLE FOR DELAYED OR UNDELIVERED MESSAGES
      </p>

      {status === "error" && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            background: "var(--danger-bg)",
            border: "1px solid var(--danger)",
            borderRadius: 10,
            color: "var(--danger)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
          }}
        >
          {error ?? "Submission failed. Please try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={!valid}
        style={{
          height: 52,
          borderRadius: 999,
          border: "none",
          background: valid ? "var(--brand-blue)" : "var(--surface-4)",
          color: valid ? "#fff" : "var(--text-3)",
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: valid ? "pointer" : "not-allowed",
          transition: "background 200ms, transform 120ms",
          marginTop: 4,
        }}
      >
        {status === "submitting" ? "Submitting…" : "Opt in to SMS"}
      </button>
    </form>
  );
};

// Exact consent language stored alongside each opt-in record (TCPA / A2P 10DLC requirement).
const CONSENT_TEXT =
  "By checking this box and submitting this form, I agree to receive recurring SMS text messages from Dealio Inc. at the mobile number I provided, including informational, account, and marketing messages (such as lead-program updates, onboarding instructions, and offers). Consent is not a condition of any purchase. Message and data rates may apply. Message frequency varies. I can reply STOP to unsubscribe or HELP for help at any time. I have read and agree to Dealio's SMS Terms and Privacy Policy.";

const CONSENT_TEXT_JSX = (
  <>
    By checking this box and submitting this form, I agree to receive recurring
    SMS text messages from <strong>Dealio Inc.</strong> at the mobile number I
    provided, including informational, account, and marketing messages (such as
    lead-program updates, onboarding instructions, and offers).{" "}
    <strong>Consent is not a condition of any purchase.</strong> Message and
    data rates may apply. Message frequency varies. I can reply{" "}
    <code>STOP</code> to unsubscribe or <code>HELP</code> for help at any time.
    I have read and agree to Dealio&apos;s{" "}
    <Link href="/sms-terms">SMS Terms</Link> and{" "}
    <Link href="/privacy">Privacy Policy</Link>.
  </>
);
