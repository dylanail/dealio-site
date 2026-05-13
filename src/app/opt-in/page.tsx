import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { Eyebrow } from "@/components/Primitives";
import { OptInForm } from "@/components/OptInForm";
import { BUSINESS, formatAddress } from "@/lib/business";

export const metadata: Metadata = {
  title: "SMS Opt-In · Dealio",
  description:
    "Opt in to receive SMS messages from Dealio about your lead program. Message and data rates may apply. Reply STOP to cancel, HELP for help.",
  robots: { index: true, follow: true },
};

export default function OptInPage() {
  return (
    <main className="page-wrap">
      <section style={{ position: "relative", padding: 12 }}>
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(8,16,48,0) 0%, rgba(8,16,48,0.85) 100%), " +
              "linear-gradient(135deg, #2A3357 0%, #081030 60%, #0E1A3D 100%)",
            paddingBottom: 80,
          }}
        >
          <Navbar onDark />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
              backgroundSize: "28px 28px",
              opacity: 0.45,
              maskImage:
                "radial-gradient(70% 70% at 50% 30%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 30%, black, transparent)",
            }}
          />
          <div
            className="section-pad"
            style={{
              position: "relative",
              zIndex: 5,
              paddingTop: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              textAlign: "center",
            }}
          >
            <Eyebrow onDark>SMS opt-in</Eyebrow>
            <h1
              className="h-section"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                maxWidth: 900,
                letterSpacing: "-0.05em",
              }}
            >
              Get lead alerts &amp; updates by text.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: "26px",
                color: "rgba(255,255,255,0.78)",
                maxWidth: 620,
                margin: 0,
                padding: "0 16px",
              }}
            >
              Sign up to receive SMS messages from{" "}
              <strong>{BUSINESS.legalName}</strong> about your lead program —
              onboarding instructions, real-time lead delivery, billing
              notices, and occasional offers. Enrollment uses a{" "}
              <strong>verified double opt-in</strong>: after you submit the
              form we&apos;ll text you to confirm, and you must reply{" "}
              <code>YES</code> before any program messages are sent. Mobile
              information (phone numbers and SMS consent) is never shared with
              third parties or affiliates for their marketing or promotional
              purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <div
          className="section-inner legal-card"
          style={{
            maxWidth: 720,
            background: "#fff",
            borderRadius: 24,
            padding: "48px 56px",
            boxShadow: "var(--shadow-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                margin: "0 0 6px",
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              SMS program enrollment
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: "22px",
                color: "var(--text-2)",
                margin: 0,
              }}
            >
              Program:{" "}
              <strong style={{ color: "var(--ink)" }}>Dealio Leads</strong> ·
              Operator:{" "}
              <strong style={{ color: "var(--ink)" }}>
                {BUSINESS.legalName}
              </strong>{" "}
              · Frequency: up to ~10 marketing msgs/month + transactional
              messages triggered by your account · Help:{" "}
              <a
                href={`mailto:${BUSINESS.supportEmail}`}
                style={{ color: "var(--brand-blue)" }}
              >
                {BUSINESS.supportEmail}
              </a>{" "}
              · Address:{" "}
              <span style={{ color: "var(--ink)" }}>{formatAddress()}</span>
            </p>
          </div>

          <OptInForm />

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              lineHeight: "20px",
              color: "var(--text-3)",
              marginTop: 24,
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Already opted in and want to stop? Reply <code>STOP</code> (or{" "}
            <code>STOPALL</code>, <code>UNSUBSCRIBE</code>, <code>CANCEL</code>,{" "}
            <code>END</code>, or <code>QUIT</code>) to any Dealio text, or email{" "}
            <a
              href={`mailto:${BUSINESS.supportEmail}`}
              style={{ color: "var(--brand-blue)" }}
            >
              {BUSINESS.supportEmail}
            </a>
            . See our{" "}
            <Link href="/sms-terms" style={{ color: "var(--brand-blue)" }}>
              SMS Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" style={{ color: "var(--brand-blue)" }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
