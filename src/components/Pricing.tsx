import { Button, Eyebrow, Section } from "./Primitives";

const plans = [
  {
    name: "Pay per lead",
    pitch: "Per booked lead",
    sub: "Quoted by market",
    desc: "Multi-channel acquisition, AI-warmed leads delivered to your phone. You only pay when a real customer is on the line.",
    features: [
      "Exclusive to your service area",
      "Pay only for booked leads",
      "AI-warmed before they call",
      "No retainers, no setup fees",
    ],
    cta: "GET A QUOTE",
    featured: false,
  },
  {
    name: "Done-for-you closing",
    pitch: "10%",
    sub: "Of booked job revenue",
    desc: "Pilot program. Our team handles every call, qualifies, and books the job onto your calendar. You only pay when revenue lands.",
    features: [
      "Includes everything in Pay per lead",
      "Our closers handle every call",
      "Booking on your calendar",
      "No charge until the job books",
    ],
    cta: "JOIN THE PILOT",
    featured: true,
    badge: "PILOT",
  },
];

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6 L5 8.5 L9.5 4"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlanCard = ({
  name,
  pitch,
  sub,
  desc,
  features,
  cta,
  featured,
  badge,
}: (typeof plans)[0]) => (
  <div
    style={{
      position: "relative",
      background: featured ? "var(--ink)" : "#fff",
      color: featured ? "#fff" : "var(--ink)",
      borderRadius: 16,
      padding: 36,
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      gap: 28,
      minHeight: 480,
    }}
  >
    {badge && (
      <span
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          padding: "4px 10px",
          borderRadius: 999,
          background: "var(--brand-blue)",
          color: "#fff",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        {badge}
      </span>
    )}
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: featured ? "var(--brand-blue)" : "var(--text-2)",
        fontWeight: 500,
      }}
    >
      {name}
    </div>
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        {pitch}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: featured ? "rgba(255,255,255,0.7)" : "var(--text-2)",
          marginTop: 8,
        }}
      >
        {sub}
      </div>
    </div>
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 15,
        lineHeight: "22px",
        color: featured ? "rgba(255,255,255,0.85)" : "var(--text-2)",
        margin: 0,
      }}
    >
      {desc}
    </p>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
      }}
    >
      {features.map((f) => (
        <li
          key={f}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 14,
            color: featured ? "rgba(255,255,255,0.9)" : "var(--text-1)",
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "var(--brand-blue)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckIcon />
          </span>
          {f}
        </li>
      ))}
    </ul>
    <Button
      variant={featured ? "primary" : "secondary"}
      size="md"
      href="mailto:thedealioteam@gmail.com"
      style={{ alignSelf: "stretch", justifyContent: "space-between" }}
    >
      {cta}
    </Button>
  </div>
);

export const Pricing = () => (
  <Section py={96} id="pricing">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        marginBottom: 48,
      }}
    >
      <Eyebrow>Pricing</Eyebrow>
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
        Two ways to work with us.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: "24px",
          color: "var(--text-2)",
          textAlign: "center",
          maxWidth: 580,
          margin: 0,
        }}
      >
        Buy leads. Or hand us the phones. Either way, no retainers, no setup fees, no shared marketplaces.
      </p>
    </div>
    <div
      className="grid-2"
      style={{
        background: "var(--surface-2)",
        borderRadius: 24,
        padding: 12,
      }}
    >
      {plans.map((p) => (
        <PlanCard key={p.name} {...p} />
      ))}
    </div>
  </Section>
);
