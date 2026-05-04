"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { Button } from "./Primitives";

interface FloatingMetricProps {
  left: string;
  top: number;
  rotate: string;
  delay?: number;
  label: string;
  value: string;
  delta: string;
  dark?: boolean;
  blue?: boolean;
}

const FloatingMetric = ({
  left,
  top,
  rotate,
  delay = 0,
  label,
  value,
  delta,
  dark,
  blue,
}: FloatingMetricProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const bg = dark
    ? "rgba(8,16,48,0.85)"
    : blue
    ? "rgba(48,104,248,0.95)"
    : "rgba(255,255,255,0.96)";
  const fg = dark || blue ? "#fff" : "#081030";
  const sub = dark || blue ? "rgba(255,255,255,0.72)" : "var(--text-2)";
  const deltaColor = blue ? "rgba(255,255,255,0.85)" : "var(--success)";

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 180,
        padding: "16px 18px",
        borderRadius: 14,
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? `translate(-50%, 0) rotate(${rotate})`
          : `translate(-50%, 80px) rotate(${rotate})`,
        transition:
          "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: sub,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: fg,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: deltaColor,
          fontWeight: 600,
        }}
      >
        {delta}
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section style={{ position: "relative", padding: 12, background: "#fff" }}>
      <div
        style={{
          position: "relative",
          height: 830,
          borderRadius: 24,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(8,16,48,0) 0%, rgba(8,16,48,0.85) 100%), " +
            "linear-gradient(135deg, #2A3357 0%, #081030 60%, #0E1A3D 100%)",
        }}
      >
        <Navbar onDark />

        {/* Photographic-feel ambient layer */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(80% 60% at 50% 80%, rgba(48,104,248,0.20) 0%, transparent 60%), " +
              "radial-gradient(40% 30% at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Headline block */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 170,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            padding: "0 80px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 72,
              lineHeight: "80px",
              letterSpacing: "-0.06em",
              textAlign: "center",
              color: "#fff",
              margin: 0,
              maxWidth: 980,
            }}
          >
            Better leads.
            <br />
            Lower prices. Zero competition.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: "28px",
              letterSpacing: "-0.02em",
              textAlign: "center",
              color: "rgba(255,255,255,0.78)",
              maxWidth: 620,
              margin: 0,
            }}
          >
            Dealio is the pay-per-lead system built for moving operators. Fresh
            customer leads on your phone in under 10 seconds — never shared,
            never resold.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Link
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                padding: "4px 20px",
                borderRadius: 999,
                background: "rgba(8,16,48,0.25)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              VIEW DEMO
            </Link>
            <Button variant="primary" size="lg" href="#quote">
              GET STARTED
            </Button>
          </div>
        </div>

        {/* Floating KPI cards */}
        <FloatingMetric
          left="50%"
          top={520}
          rotate="-2deg"
          delay={400}
          label="Close rate"
          value="32%"
          delta="↑ above industry avg"
        />
        <FloatingMetric
          left="14%"
          top={560}
          rotate="3deg"
          delay={150}
          label="Lead speed"
          value="<10s"
          delta="form to your phone"
          dark
        />
        <FloatingMetric
          left="78%"
          top={550}
          rotate="-3deg"
          delay={650}
          label="Avg job"
          value="$1,248"
          delta="moving vertical"
          blue
        />

        {/* Trust bar */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 18px 10px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "var(--brand-blue)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 L4 6 V12 C4 17 7 20.5 12 22 C17 20.5 20 17 20 12 V6 Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12 L11 14.5 L15.5 9.5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.01em",
              }}
            >
              <strong style={{ fontWeight: 600, color: "#fff" }}>
                Lead exclusivity guaranteed.
              </strong>
              <span style={{ opacity: 0.7 }}>
                {" "}
                · Built for moving operators.
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
