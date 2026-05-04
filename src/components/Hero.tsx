"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { Button } from "./Primitives";

interface FloatingMetricProps {
  leftPct: number;
  topPct: number;
  baseRotate: number;
  delay?: number;
  swingAxis: number;
  parallaxSpeed: number;
  scrollY: number;
  heroBottom: number;
  label: string;
  value: string;
  delta: string;
  dark?: boolean;
  blue?: boolean;
}

const FloatingMetric = ({
  leftPct,
  topPct,
  baseRotate,
  delay = 0,
  swingAxis,
  parallaxSpeed,
  scrollY,
  heroBottom,
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
    ? "rgba(8,16,48,0.92)"
    : blue
    ? "rgba(48,104,248,0.96)"
    : "rgba(255,255,255,0.98)";
  const fg = dark || blue ? "#fff" : "#081030";
  const sub = dark || blue ? "rgba(255,255,255,0.72)" : "var(--text-2)";
  const deltaColor = blue ? "rgba(255,255,255,0.95)" : "var(--success)";

  const progress = Math.max(0, Math.min(1, scrollY / Math.max(heroBottom, 1)));
  const swingRotate = baseRotate + swingAxis * progress;
  const drift = -scrollY * parallaxSpeed;

  return (
    <div
      className="hide-mobile"
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: 240,
        padding: "20px 22px",
        borderRadius: 18,
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.32), 0 2px 0 rgba(255,255,255,0.05) inset",
        border: dark || blue ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(8,16,48,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? `translate(-50%, ${drift}px) rotate(${swingRotate}deg)`
          : `translate(-50%, ${drift + 100}px) rotate(${baseRotate}deg)`,
        transition: mounted
          ? "transform 80ms linear, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)"
          : "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: sub,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: fg,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
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
  const [scrollY, setScrollY] = useState(0);
  const [heroBottom, setHeroBottom] = useState(900);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        setHeroBottom(ref.current.offsetHeight);
      }
    };
    measure();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "12px",
        background: "transparent",
      }}
    >
      <div
        className="hero-card"
        style={{
          position: "relative",
          minHeight: 1040,
          borderRadius: 24,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(8,16,48,0) 0%, rgba(8,16,48,0.85) 100%), " +
            "linear-gradient(135deg, #2A3357 0%, #081030 60%, #0E1A3D 100%)",
        }}
      >
        <Navbar onDark />

        {/* dotted grid overlay for the hero (futuristic feel) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            opacity: 0.55,
            maskImage:
              "radial-gradient(70% 70% at 50% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 50% 30%, black, transparent)",
          }}
        />

        {/* ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(80% 60% at 50% 80%, rgba(48,104,248,0.22) 0%, transparent 60%), " +
              "radial-gradient(40% 30% at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Headline block */}
        <div
          className="section-pad"
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            paddingTop: 160,
            paddingBottom: 40,
          }}
        >
          <h1
            className="hero-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              textAlign: "center",
              color: "#fff",
              margin: 0,
              maxWidth: 1080,
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
              maxWidth: 640,
              margin: 0,
              padding: "0 16px",
            }}
          >
            Dealio is the pay-per-lead system built for moving operators. Fresh
            customer leads on your phone in under 10 seconds — never shared,
            never resold.
          </p>
          <div
            className="stack-mobile"
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                padding: "4px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.16)",
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
            <Button variant="primary" size="lg" href="#contact">
              GET STARTED
            </Button>
          </div>
        </div>

        {/* Floating KPI cards — scroll-driven swing */}
        <FloatingMetric
          leftPct={50}
          topPct={74}
          baseRotate={-2}
          swingAxis={-14}
          parallaxSpeed={0.18}
          delay={400}
          scrollY={scrollY}
          heroBottom={heroBottom}
          label="Close rate"
          value="32%"
          delta="↑ above industry avg"
        />
        <FloatingMetric
          leftPct={15}
          topPct={78}
          baseRotate={3}
          swingAxis={20}
          parallaxSpeed={0.30}
          delay={150}
          scrollY={scrollY}
          heroBottom={heroBottom}
          label="Lead speed"
          value="<10s"
          delta="form to your phone"
          dark
        />
        <FloatingMetric
          leftPct={85}
          topPct={76}
          baseRotate={-3}
          swingAxis={-20}
          parallaxSpeed={0.24}
          delay={650}
          scrollY={scrollY}
          heroBottom={heroBottom}
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
            zIndex: 4,
            padding: "0 16px",
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
              maxWidth: "100%",
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
