"use client";

import { useState } from "react";
import { Eyebrow, Section } from "./Primitives";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "How is Dealio different from a lead marketplace?",
    a: "Marketplaces sell the same lead to three to seven competitors. We sell each lead once. When a customer fills out a Dealio form, you're the only mover who gets the call.",
  },
  {
    q: "What does a lead actually cost?",
    a: "Per-lead pricing is quoted by market. Larger metros and competitive zip codes price differently than smaller markets. Book a call and we'll quote your territory in under 15 minutes.",
  },
  {
    q: "Do I have to use the closing service?",
    a: "No. Done-for-you closing is optional and pricing is tailored per operator — performance-based, no monthly fees. Most operators start with leads-only and add the closing service later.",
  },
  {
    q: "What's your policy on bad-quality or invalid leads?",
    a: "Clearly invalid leads — wrong number, outside your service area, duplicate, or fake submissions — are credited within 48 hours. Aggressive screening before delivery means very few make it through. Your job is closing; ours is delivering qualified prospects.",
  },
  {
    q: "How fast do leads actually reach me after they fill out the form?",
    a: "Under 10 seconds. The moment a customer submits, our system pings your phone — no batching, no overnight queues. Lead age matters: a 10-second-old lead picks up. A 5-minute-old lead is already ten times harder to close.",
  },
  {
    q: "How fast can you turn on leads in my market?",
    a: "Most markets go live within 7 to 10 days of contract. We confirm coverage, set your spend cap, and route the first leads to your number.",
  },
  {
    q: "Are leads shared with my competitors?",
    a: "No. Every Dealio lead is sold to exactly one operator. When a customer fills out our form, you're the only mover who gets that contact — no shared marketplace, no auction, no second buyer.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "20px 0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
          gap: 24,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "26px",
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
          }}
        >
          {q}
        </span>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: open ? "var(--brand-blue)" : "var(--surface-2)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 200ms cubic-bezier(0.2,0,0,1)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 200ms cubic-bezier(0.2,0,0,1)",
            }}
          >
            <path
              d="M12 5v14M5 12h14"
              stroke={open ? "#fff" : "var(--text-1)"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 320ms cubic-bezier(0.2,0,0,1), margin-top 320ms cubic-bezier(0.2,0,0,1)",
          marginTop: open ? 12 : 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: "24px",
            color: "var(--text-2)",
            margin: 0,
            maxWidth: 720,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
};

export const FAQ = () => (
  <Section py={96} id="faq">
    <div className="grid-faq">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "sticky",
          top: 32,
        }}
      >
        <Eyebrow>FAQ</Eyebrow>
        <h2
          className="h-section"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--text-1)",
            margin: 0,
          }}
        >
          Questions, answered.
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
          The things operators ask before they sign on. If yours isn&apos;t here, email us — we&apos;ll get back same day.
        </p>
      </div>
      <div>
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 80} distance={20}>
            <FAQItem {...f} />
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);
