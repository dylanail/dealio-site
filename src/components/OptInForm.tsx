"use client";

import { useState } from "react";
import Link from "next/link";
import { CONSENT_VERSION, STOP_KEYWORDS } from "@/lib/sms-consent";
import { BUSINESS } from "@/lib/business";

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

const attestationRow: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  lineHeight: "20px",
  color: "var(--text-1)",
};

type Status = "idle" | "submitting" | "pending_confirmation" | "error";

const formatPhone = (raw: string) => {
  const digits = raw.replace(/[^\d]/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const ConsentDisclosure = () => (
  <>
    By checking these boxes and submitting this form, I expressly authorize{" "}
    <strong>{BUSINESS.legalName}</strong> to send me recurring SMS text
    messages — including marketing messages — at the U.S. mobile number I
    provided,{" "}
    <strong>
      including messages sent using an automatic telephone dialing system
      (ATDS) or other automated technology
    </strong>
    . Messages may include lead-program updates, onboarding instructions,
    account and billing notices, and offers. Up to ~10 marketing messages per
    month plus transactional messages triggered by my account activity;
    frequency varies.{" "}
    <strong>
      Consent to receive marketing texts is not required as a condition of
      purchasing any goods or services.
    </strong>{" "}
    <strong>
      I understand my enrollment is confirmed only after I reply{" "}
      <code>YES</code> to the verification text sent to my number.
    </strong>{" "}
    Message and data rates may apply. I can reply <code>STOP</code>,{" "}
    <code>STOPALL</code>, <code>UNSUBSCRIBE</code>, <code>CANCEL</code>,{" "}
    <code>END</code>, or <code>QUIT</code> at any time to opt out, or{" "}
    <code>HELP</code> / <code>INFO</code> for help. I have read and agree to
    Dealio&apos;s <Link href="/sms-terms">SMS Terms</Link> and{" "}
    <Link href="/privacy">Privacy Policy</Link>.
  </>
);

const missingFieldsMessage = (state: {
  name: string;
  phoneDigits: number;
  consent: boolean;
  ageConfirmed: boolean;
  subscriberConfirmed: boolean;
}): string | null => {
  const missing: string[] = [];
  if (state.name.trim().length < 2) missing.push("Full name");
  if (state.phoneDigits !== 10) missing.push("Mobile phone (10 digits)");
  if (!state.consent) missing.push("SMS consent");
  if (!state.ageConfirmed) missing.push("18+ confirmation");
  if (!state.subscriberConfirmed) missing.push("Number-ownership confirmation");
  if (missing.length === 0) return null;
  return `Please complete: ${missing.join(", ")}.`;
};

export const OptInForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [subscriberConfirmed, setSubscriberConfirmed] = useState(false);
  // Honeypot. Real users never fill this. If a screen reader or password
  // manager ever does fill it (rare — see the wrapper styles + autocomplete
  // hints), the server logs the trip and silently 200s; support can then
  // reach out via email.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/[^\d]/g, "").length;
  const valid =
    name.trim().length >= 2 &&
    phoneDigits === 10 &&
    consent &&
    ageConfirmed &&
    subscriberConfirmed &&
    status !== "submitting";

  const completionHint = missingFieldsMessage({
    name,
    phoneDigits,
    consent,
    ageConfirmed,
    subscriberConfirmed,
  });

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
          phone: `+1${phone.replace(/[^\d]/g, "")}`,
          email: email.trim() || null,
          company: company.trim() || null,
          consent: true,
          ageConfirmed: true,
          subscriberConfirmed: true,
          consentVersion: CONSENT_VERSION,
          consentTimestamp: new Date().toISOString(),
          website, // honeypot
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Submission failed");
      }
      setStatus("pending_confirmation");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "pending_confirmation") {
    return (
      <div
        role="status"
        aria-live="polite"
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
          Check your phone.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: "24px",
            color: "var(--text-2)",
            margin: 0,
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We just texted{" "}
          <strong style={{ color: "var(--ink)" }}>{formatPhone(phone)}</strong>.
          Reply <code>YES</code> to confirm enrollment in Dealio Leads — your
          opt-in is not complete until you reply. Reply <code>STOP</code> at
          any time to cancel, or <code>HELP</code> for help.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: "20px",
            color: "var(--text-3)",
            margin: "12px 0 0",
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Didn&apos;t get the text after a minute or two? Check the number and{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              color: "var(--brand-blue)",
              cursor: "pointer",
              font: "inherit",
              textDecoration: "underline",
            }}
          >
            try again
          </button>
          , or email{" "}
          <a href={`mailto:${BUSINESS.supportEmail}`}>
            {BUSINESS.supportEmail}
          </a>
          .
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
          U.S. mobile numbers only. We&apos;ll text you a verification message
          — you must reply <code>YES</code> to complete enrollment.
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

      {/*
        Honeypot — visually hidden, removed from accessibility tree, not part
        of tab order, autofill suppressed. We use a label that explicitly
        tells humans NOT to fill it (in case any assistive tech surfaces it
        anyway), and a name (`website`) that browser-autofill heuristics
        generally do not target for a person's contact form.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <label htmlFor="optin-website">
          If you are a human, leave this field blank.
        </label>
        <input
          id="optin-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div
        style={{
          marginTop: 4,
          padding: "20px 22px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <input
            id="optin-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            aria-required="true"
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
            <ConsentDisclosure />
          </label>
        </div>

        <div style={attestationRow}>
          <input
            id="optin-age"
            type="checkbox"
            checked={ageConfirmed}
            onChange={(e) => setAgeConfirmed(e.target.checked)}
            required
            aria-required="true"
            style={{
              marginTop: 3,
              width: 16,
              height: 16,
              flexShrink: 0,
              accentColor: "var(--brand-blue)",
              cursor: "pointer",
            }}
          />
          <label htmlFor="optin-age" style={{ cursor: "pointer" }}>
            I confirm I am at least 18 years old.
          </label>
        </div>

        <div style={attestationRow}>
          <input
            id="optin-subscriber"
            type="checkbox"
            checked={subscriberConfirmed}
            onChange={(e) => setSubscriberConfirmed(e.target.checked)}
            required
            aria-required="true"
            style={{
              marginTop: 3,
              width: 16,
              height: 16,
              flexShrink: 0,
              accentColor: "var(--brand-blue)",
              cursor: "pointer",
            }}
          />
          <label htmlFor="optin-subscriber" style={{ cursor: "pointer" }}>
            I confirm the mobile number above is mine, or that I am authorized
            to enroll it.
          </label>
        </div>
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
        MSG &amp; DATA RATES MAY APPLY · UP TO ~10 MARKETING MSGS/MONTH +
        TRANSACTIONAL · VERIFIED DOUBLE OPT-IN (REPLY{" "}
        <strong style={{ color: "var(--text-2)" }}>YES</strong> TO CONFIRM) ·
        REPLY{" "}
        <strong style={{ color: "var(--text-2)" }}>
          {STOP_KEYWORDS.join(" / ")}
        </strong>{" "}
        TO CANCEL,{" "}
        <strong style={{ color: "var(--text-2)" }}>HELP</strong> OR{" "}
        <strong style={{ color: "var(--text-2)" }}>INFO</strong> FOR HELP ·
        CARRIERS ARE NOT LIABLE FOR DELAYED OR UNDELIVERED MESSAGES
      </p>

      <div
        role="status"
        aria-live="polite"
        style={{ minHeight: 0 }}
      >
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
        {status !== "error" && completionHint && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              lineHeight: "18px",
              color: "var(--text-3)",
              margin: 0,
            }}
          >
            {completionHint}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!valid}
        aria-describedby="optin-submit-hint"
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
        {status === "submitting" ? "Sending verification…" : "Send verification text"}
      </button>
      <span id="optin-submit-hint" style={{ display: "none" }}>
        Submitting will text a verification code to the number above. You must
        reply YES to complete enrollment.
      </span>
    </form>
  );
};
