import { Eyebrow, Section } from "./Primitives";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#081030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: "Multi-channel acquisition",
    desc: "High-performance paid traffic across Google, Meta, YouTube, and native — tuned for movers, market by market.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#081030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h3l3-9 6 18 3-9h3"/>
      </svg>
    ),
    title: "AI-warmed leads",
    desc: "Every lead is qualified and warmed by our system before it ever hits your phone — so when you call, they're ready to talk.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#081030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
      </svg>
    ),
    title: "Done-for-you closing (optional)",
    desc: "Want us to handle the call too? Our team takes the lead from first contact to booked job — performance-based pricing, quoted per operator.",
  },
];

const ServiceCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: 24,
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      gap: 80,
      minHeight: 300,
      flex: 1,
      width: "100%",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "var(--brand-blue)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          lineHeight: "32px",
          letterSpacing: "-0.04em",
          fontWeight: 500,
          color: "var(--text-1)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: "24px",
          color: "var(--text-2)",
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  </div>
);

export const Services = () => (
  <Section py={96} id="how-it-works">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        marginBottom: 48,
      }}
    >
      <Eyebrow>How it works</Eyebrow>
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
        Lead, warmed, on your phone — in that order.
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
        We run the acquisition stack so you can run the trucks. Closing is optional — keep it in-house, or hand it to us.
      </p>
    </div>

    <div
      className="grid-services"
      style={{
        background: "var(--surface-2)",
        borderRadius: 24,
        padding: 12,
      }}
    >
      {services.map((s, i) => (
        <Reveal key={i} delay={i * 140}>
          <ServiceCard {...s} />
        </Reveal>
      ))}
    </div>
  </Section>
);
