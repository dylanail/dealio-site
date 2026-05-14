import { Button, Eyebrow, Section } from "./Primitives";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Pay per lead",
    pitch: "Per lead",
    sub: "Quoted by market",
    desc: "Multi-channel acquisition with AI-warmed leads delivered to your phone in under 10 seconds. Transparent flat per-lead pricing.",
    features: [
      "Every lead sold once — never shared",
      "Fresh leads in <10 seconds",
      "AI-warmed before they call",
      "No retainers, no setup fees",
    ],
    cta: "GET A QUOTE",
    featured: false,
  },
  {
    name: "Done-for-you closing",
    pitch: "Custom",
    sub: "Performance-based fee",
    desc: "Pilot program. Our team handles every call, qualifies, and books the job onto your calendar. Pricing tailored to your volume and ticket size.",
    features: [
      "Includes everything in Pay per lead",
      "Our closers handle every call",
      "Booking on your calendar",
      "Performance-based, quoted per operator",
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
      flex: 1,
      width: "100%",
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
      href="mailto:hello@trydeal.io"
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
      {plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 160}>
          <PlanCard {...p} />
        </Reveal>
      ))}
    </div>
  </Section>
);
