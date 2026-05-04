import { Eyebrow, Section } from "./Primitives";

const reasons = [
  {
    title: "No retainers",
    desc: "Zero monthly fees, zero setup. You pay per booked lead — nothing more, nothing less.",
  },
  {
    title: "No shared marketplaces",
    desc: "Every lead is yours alone. We never sell the same contact to a competitor down the street.",
  },
  {
    title: "Pay only when it counts",
    desc: "Lead doesn't pick up? Doesn't book? You don't pay. We bear the acquisition risk, not you.",
  },
  {
    title: "Built for moving",
    desc: "We don't dabble in twelve verticals. We obsess over one — the moving operator playbook.",
  },
];

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReasonCard = ({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      minHeight: 220,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: index < 2 ? "var(--ink)" : "var(--brand-blue)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {index < 2 ? <XIcon /> : <CheckIcon />}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-2)",
          fontWeight: 500,
        }}
      >
        0{index + 1}
      </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          lineHeight: "28px",
          letterSpacing: "-0.04em",
          fontWeight: 600,
          color: "var(--text-1)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: "22px",
          color: "var(--text-2)",
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  </div>
);

export const WhyDealio = () => (
  <Section py={96} bg="var(--surface-2)" id="why-dealio">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        marginBottom: 48,
      }}
    >
      <Eyebrow>Why Dealio</Eyebrow>
      <h2
        className="h-section"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          color: "var(--text-1)",
          textAlign: "center",
          maxWidth: 720,
          margin: 0,
        }}
      >
        Everything agencies aren&apos;t.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: "24px",
          color: "var(--text-2)",
          textAlign: "center",
          maxWidth: 560,
          margin: 0,
        }}
      >
        We built Dealio because the way moving leads get bought and sold is broken. Here&apos;s how we&apos;re different.
      </p>
    </div>
    <div className="grid-4">
      {reasons.map((r, i) => (
        <ReasonCard key={r.title} {...r} index={i} />
      ))}
    </div>
  </Section>
);
