import Image from "next/image";
import Link from "next/link";
import { Button, Eyebrow, Section } from "./Primitives";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 40,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: "var(--ink)",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-2)",
      }}
    >
      {label}
    </div>
  </div>
);

export const AboutBlock = () => (
  <Section py={96} id="about">
    <div className="grid-about">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Eyebrow>About Dealio</Eyebrow>
        <h2
          className="h-section"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--text-1)",
            margin: 0,
          }}
        >
          Built by operators. For movers.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: "24px",
            color: "var(--text-2)",
            margin: 0,
          }}
        >
          We started Dealio after a decade of running and selling moving
          businesses ourselves. We were tired of agencies promising the moon and
          delivering form fills. So we built the system we always wanted: pay
          only for booked work, and never share leads with anyone else.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 16,
          }}
        >
          <Stat label="Avg close rate" value="32%" />
          <Stat label="Avg job value" value="$1,248" />
          <Stat label="Lead delivery" value="<10s" />
        </div>
      </div>
      <div
        style={{
          minHeight: 360,
          height: 480,
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(8,16,48,0) 0%, rgba(8,16,48,0.6) 100%), " +
            "linear-gradient(135deg, #3068F8 0%, #1F4FE0 50%, #081030 100%)",
          boxShadow: "var(--shadow-card-hover)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            opacity: 0.5,
            maskImage:
              "radial-gradient(80% 80% at 50% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(80% 80% at 50% 30%, black, transparent)",
          }}
        />
      </div>
    </div>
  </Section>
);

export const CTABand = () => (
  <Section py={96} id="contact">
    <div
      style={{
        borderRadius: 24,
        padding: "72px 56px",
        background:
          "linear-gradient(135deg, #3068F8 0%, #1F4FE0 60%, #081030 130%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        textAlign: "center",
      }}
    >
      <Eyebrow onDark>Ready when you are</Eyebrow>
      <h2
        className="h-section"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          color: "#fff",
          maxWidth: 720,
          margin: 0,
        }}
      >
        Stop chasing leads. Start running jobs.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: "24px",
          color: "rgba(255,255,255,0.78)",
          maxWidth: 520,
          margin: 0,
        }}
      >
        15-minute call. We&apos;ll quote you a per-lead price for your zip codes — or get you set up with done-for-you closing.
      </p>
      <div className="stack-mobile" style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="primary" size="lg" href="https://calendly.com/dealio">
          BOOK A CALL
        </Button>
        <Link
          href="mailto:hello@dealio.com"
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
          }}
        >
          EMAIL US
        </Link>
      </div>
    </div>
  </Section>
);

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h6
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
        margin: "0 0 14px",
        fontWeight: 500,
      }}
    >
      {title}
    </h6>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {links.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#fff",
              textDecoration: "none",
              opacity: 0.85,
            }}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer style={{ padding: "12px 12px 48px", background: "#fff" }}>
    <div
      style={{
        borderRadius: 24,
        background: "var(--ink)",
        color: "#fff",
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div className="grid-footer">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Image
            src="/dealio-logo.png"
            alt="Dealio"
            width={120}
            height={32}
            style={{
              height: 32,
              width: "auto",
              filter: "brightness(0) invert(1)",
              alignSelf: "flex-start",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: "22px",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: 360,
              letterSpacing: "-0.02em",
            }}
          >
            Pay-per-lead acquisition for moving operators. Real customers,
            warmed and ready — and never sold twice.
          </p>
          <div className="stack-mobile" style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="Your work email"
              style={{
                height: 48,
                padding: "0 16px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                outline: "none",
                maxWidth: 260,
                flex: 1,
                minWidth: 180,
                letterSpacing: "-0.02em",
              }}
            />
            <Button variant="primary" size="md" href="#contact">
              SUBMIT
            </Button>
          </div>
        </div>
        <FooterCol
          title="Product"
          links={[
            { label: "How it works", href: "#how-it-works" },
            { label: "Why Dealio", href: "#why-dealio" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
            { label: "Email us", href: "mailto:hello@dealio.com" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Security", href: "#" },
          ]}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <span>© 2026 Dealio Inc.</span>
        <span>Built for movers.</span>
      </div>
    </div>
  </footer>
);
