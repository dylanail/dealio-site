import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./Navbar";
import { Footer } from "./Sections";
import { Eyebrow } from "./Primitives";

export const LegalPage = ({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) => (
  <main className="page-wrap">
    <section
      style={{
        position: "relative",
        padding: 12,
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(8,16,48,0) 0%, rgba(8,16,48,0.85) 100%), " +
            "linear-gradient(135deg, #2A3357 0%, #081030 60%, #0E1A3D 100%)",
          paddingBottom: 96,
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
          <Eyebrow onDark>{eyebrow}</Eyebrow>
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
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            Last updated · {updated}
          </p>
        </div>
      </div>
    </section>

    <section className="section-pad" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <div
        className="section-inner legal-card"
        style={{
          maxWidth: 880,
          background: "#fff",
          borderRadius: 24,
          padding: "56px 64px",
          boxShadow: "var(--shadow-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="legal-prose">{children}</div>
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
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
          <Image
            src="/dealio-logo.png"
            alt="Dealio"
            width={1051}
            height={322}
            style={{ height: 24, width: "auto", opacity: 0.5 }}
          />
        </div>
      </div>
    </section>

    <Footer />
  </main>
);
