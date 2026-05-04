import React from "react";
import Link from "next/link";

export const ArrowUR = ({ size = 14, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path
      d="M3 11L11 3M11 3H4.5M11 3V9.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type ButtonVariant = "primary" | "secondary" | "ghost" | "translucent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  variant = "primary",
  size = "lg",
  children,
  href = "#",
  style,
  className,
  onClick,
}: ButtonProps) => {
  const showArrow = variant === "primary";
  const arrowSize = size === "sm" ? 10 : size === "md" ? 12 : 14;

  const sizeStyles: React.CSSProperties =
    size === "lg"
      ? { height: 48, padding: "4px 4px 4px 20px" }
      : size === "md"
      ? { height: 40, padding: "4px 4px 4px 16px" }
      : { height: 32, padding: "4px 4px 4px 12px", fontSize: 12, letterSpacing: "0.10em" };

  const arrowSize2 = size === "sm" ? 24 : size === "md" ? 32 : 40;

  const variantStyles: React.CSSProperties =
    variant === "primary"
      ? { background: "var(--brand-blue)", color: "#fff" }
      : variant === "secondary"
      ? { background: "var(--ink)", color: "var(--brand-blue)", paddingRight: 20 }
      : variant === "ghost"
      ? { background: "transparent", color: "var(--text-1)", border: "1px solid var(--border)", paddingRight: 20 }
      : { background: "rgba(8,16,48,0.25)", color: "#fff", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", paddingRight: 20 };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-pill)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 200ms cubic-bezier(0.2,0,0,1), color 200ms cubic-bezier(0.2,0,0,1), transform 120ms cubic-bezier(0.2,0,0,1), filter 200ms cubic-bezier(0.2,0,0,1)",
    ...sizeStyles,
    ...variantStyles,
    ...style,
  };

  const content = (
    <>
      <span style={{ padding: "0 4px" }}>{children}</span>
      {showArrow && (
        <span
          style={{
            width: arrowSize2,
            height: arrowSize2,
            borderRadius: 999,
            background: "var(--ink)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ArrowUR size={arrowSize} />
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button style={baseStyle} className={className} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} style={baseStyle} className={className}>
      {content}
    </Link>
  );
};

export const Eyebrow = ({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: onDark ? "var(--text-on-dark)" : "var(--text-1)",
    }}
  >
    <span
      style={{
        width: 4,
        height: 4,
        background: "var(--brand-blue)",
        borderRadius: 999,
        flexShrink: 0,
      }}
    />
    {children}
  </span>
);

export const Section = ({
  children,
  bg,
  py = 96,
  style,
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  py?: number;
  style?: React.CSSProperties;
  id?: string;
}) => (
  <section
    id={id}
    className="section-pad section-y-pad"
    style={{
      background: bg ?? "transparent",
      paddingTop: py,
      paddingBottom: py,
      ...style,
    }}
  >
    <div className="section-inner">{children}</div>
  </section>
);
