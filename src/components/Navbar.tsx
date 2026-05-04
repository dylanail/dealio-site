"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Primitives";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Dealio", href: "#why-dealio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const Navbar = ({ onDark = true }: { onDark?: boolean }) => {
  const [open, setOpen] = useState(false);
  const linkColor = onDark ? "#fff" : "var(--ink)";

  return (
    <nav
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        height: 76,
        borderRadius: 14,
        background: onDark ? "rgba(8,16,48,0.45)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: onDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(8,16,48,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 20,
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src="/dealio-logo.png"
          alt="Dealio"
          width={1051}
          height={322}
          priority
          style={{
            height: 40,
            width: "auto",
            filter: onDark ? "brightness(0) invert(1)" : "none",
          }}
        />
      </Link>

      <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
        {navLinks.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: linkColor,
              opacity: 0.85,
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: 999,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="hide-mobile">
        <Button variant="primary" size="md" href="#contact">
          GET STARTED
        </Button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        style={{
          display: "none",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 999,
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: linkColor,
        }}
        className="show-mobile-flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {open ? (
            <path d="M6 6L18 18M6 18L18 6" stroke={linkColor} strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke={linkColor} strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* Mobile menu drawer */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 84,
            left: 0,
            right: 0,
            background: "rgba(8,16,48,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 25,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
                padding: "16px 12px",
                borderRadius: 8,
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 8 }}>
            <Button variant="primary" size="md" href="#contact">
              GET STARTED
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
