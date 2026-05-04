import Image from "next/image";
import Link from "next/link";
import { Button } from "./Primitives";

const navLinks = ["How it works", "Why Dealio", "Pricing", "FAQ"];

export const Navbar = ({ onDark = true }: { onDark?: boolean }) => {
  const linkColor = onDark ? "#fff" : "var(--ink)";
  return (
    <nav
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        height: 76,
        borderRadius: 12,
        background: onDark ? "rgba(8,16,48,0.45)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src="/dealio-logo.png"
          alt="Dealio"
          width={120}
          height={26}
          style={{
            height: 26,
            width: "auto",
            filter: onDark ? "brightness(0) invert(1)" : "none",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {navLinks.map((l) => (
          <Link
            key={l}
            href="#"
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
            {l}
          </Link>
        ))}
      </div>
      <Button variant="primary" size="md" href="#quote">
        GET STARTED
      </Button>
    </nav>
  );
};
