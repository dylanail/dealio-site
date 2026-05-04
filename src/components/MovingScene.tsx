"use client";

import { useState, useEffect, useRef } from "react";

// Stylized SVG illustration — moving truck driving across, scroll-linked.
// Replace with a real photograph by dropping a JPG into /public.

export const MovingScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section just entered bottom of viewport,
        // 1 when section just exited top of viewport
        const total = vh + rect.height;
        const traveled = vh - rect.top;
        setProgress(Math.max(-0.2, Math.min(1.2, traveled / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Truck enters from left (x=-260) and exits right (x=+260)
  const truckX = -260 + progress * 520;
  // Wheels rotate as truck "drives" — 1080deg over the full traverse
  const wheelRotation = progress * 1080;
  // Subtle vertical bobble simulating road
  const bobble = Math.sin(progress * 18) * 1.5;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 360,
        borderRadius: 24,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #4A7BFF 0%, #3068F8 28%, #1F4FE0 58%, #0E1A3D 100%)",
        boxShadow: "var(--shadow-card-hover)",
      }}
    >
      {/* Dotted grid backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          opacity: 0.55,
          maskImage:
            "radial-gradient(80% 80% at 50% 30%, black 50%, transparent)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 50% 30%, black 50%, transparent)",
        }}
      />

      {/* Sky glow + horizon */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(50% 35% at 80% 25%, rgba(255,255,255,0.18), transparent 60%)," +
            "radial-gradient(60% 40% at 20% 80%, rgba(8,16,48,0.45), transparent 70%)",
        }}
      />

      {/* Truck scene SVG */}
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMax meet"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "78%",
        }}
        aria-hidden
      >
        {/* Road surface */}
        <line
          x1="0"
          y1="335"
          x2="600"
          y2="335"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        {/* Road dashes — also drift to suggest motion */}
        <g
          transform={`translate(${(progress * 80) % 60}, 0)`}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="-20" y1="335" x2="0" y2="335" />
          <line x1="40" y1="335" x2="60" y2="335" />
          <line x1="100" y1="335" x2="120" y2="335" />
          <line x1="160" y1="335" x2="180" y2="335" />
          <line x1="220" y1="335" x2="240" y2="335" />
          <line x1="280" y1="335" x2="300" y2="335" />
          <line x1="340" y1="335" x2="360" y2="335" />
          <line x1="400" y1="335" x2="420" y2="335" />
          <line x1="460" y1="335" x2="480" y2="335" />
          <line x1="520" y1="335" x2="540" y2="335" />
          <line x1="580" y1="335" x2="600" y2="335" />
        </g>

        {/* TRUCK GROUP — translates with scroll */}
        <g transform={`translate(${truckX}, ${bobble})`}>
          {/* Shadow */}
          <ellipse
            cx="280"
            cy="338"
            rx="220"
            ry="6"
            fill="rgba(0,0,0,0.32)"
          />

          {/* CARGO BOX — large white container with door */}
          <g>
            {/* Box body */}
            <rect
              x="60"
              y="170"
              width="320"
              height="155"
              rx="6"
              fill="#FFFFFF"
            />
            {/* Top edge shadow */}
            <rect
              x="60"
              y="170"
              width="320"
              height="155"
              rx="6"
              fill="url(#boxShade)"
            />
            {/* Roll-up door at the back */}
            <rect
              x="68"
              y="180"
              width="58"
              height="138"
              rx="3"
              fill="#F0F2F8"
              stroke="rgba(8,16,48,0.18)"
              strokeWidth="1"
            />
            {/* Door horizontal slats */}
            <g stroke="rgba(8,16,48,0.13)" strokeWidth="1">
              <line x1="68" y1="195" x2="126" y2="195" />
              <line x1="68" y1="208" x2="126" y2="208" />
              <line x1="68" y1="221" x2="126" y2="221" />
              <line x1="68" y1="234" x2="126" y2="234" />
              <line x1="68" y1="247" x2="126" y2="247" />
              <line x1="68" y1="260" x2="126" y2="260" />
              <line x1="68" y1="273" x2="126" y2="273" />
              <line x1="68" y1="286" x2="126" y2="286" />
              <line x1="68" y1="299" x2="126" y2="299" />
            </g>
            {/* Door handle */}
            <rect
              x="89"
              y="305"
              width="16"
              height="6"
              rx="2"
              fill="rgba(8,16,48,0.4)"
            />

            {/* Side panel divider lines */}
            <line
              x1="200"
              y1="178"
              x2="200"
              y2="320"
              stroke="rgba(8,16,48,0.10)"
              strokeWidth="1"
            />
            <line
              x1="290"
              y1="178"
              x2="290"
              y2="320"
              stroke="rgba(8,16,48,0.10)"
              strokeWidth="1"
            />

            {/* DEALIO branding on side */}
            <text
              x="240"
              y="237"
              textAnchor="middle"
              fontFamily="Plus Jakarta Sans, system-ui"
              fontSize="22"
              fontWeight="800"
              fill="#3068F8"
              letterSpacing="1"
            >
              dealio
            </text>
            {/* Tagline below */}
            <text
              x="240"
              y="258"
              textAnchor="middle"
              fontFamily="Geist Mono, ui-monospace"
              fontSize="7"
              fontWeight="500"
              fill="rgba(8,16,48,0.55)"
              letterSpacing="1.5"
            >
              MOVING — DONE RIGHT
            </text>

            {/* Vent strip on side */}
            <rect
              x="140"
              y="186"
              width="40"
              height="6"
              rx="2"
              fill="rgba(8,16,48,0.10)"
            />
          </g>

          {/* CAB — front of truck */}
          <g>
            {/* Cab body */}
            <path
              d="M380 198 L455 198 Q470 198 472 212 L478 235 L478 325 L380 325 Z"
              fill="#081030"
            />
            {/* Windshield */}
            <path
              d="M390 208 L450 208 Q458 208 462 222 L466 232 L390 232 Z"
              fill="#3068F8"
              opacity="0.95"
            />
            {/* Windshield highlight */}
            <path
              d="M390 208 L408 208 L408 232 L390 232 Z"
              fill="rgba(255,255,255,0.45)"
            />
            {/* Door seam */}
            <line
              x1="425"
              y1="232"
              x2="425"
              y2="320"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            {/* Side door handle */}
            <rect
              x="438"
              y="265"
              width="14"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.5)"
            />
            {/* Headlight */}
            <rect
              x="468"
              y="278"
              width="10"
              height="14"
              rx="2"
              fill="rgba(255,240,180,0.95)"
            />
            {/* Side mirror */}
            <rect
              x="383"
              y="225"
              width="6"
              height="14"
              rx="1"
              fill="#081030"
            />
            <line
              x1="389"
              y1="232"
              x2="395"
              y2="232"
              stroke="#081030"
              strokeWidth="1.5"
            />
            {/* Bumper */}
            <rect
              x="465"
              y="320"
              width="14"
              height="8"
              rx="2"
              fill="rgba(255,255,255,0.18)"
            />
          </g>

          {/* WHEELS — only 2, large, with rotating spokes */}
          {/* Rear wheel under cargo box */}
          <g
            transform={`translate(140, 325) rotate(${wheelRotation})`}
          >
            <circle r="28" fill="#0A0F22" />
            <circle r="22" fill="#1A2342" />
            <circle r="8" fill="#2A3357" stroke="#FFFFFF" strokeWidth="1" />
            {/* Spokes */}
            <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Front wheel under cab */}
          <g
            transform={`translate(440, 325) rotate(${wheelRotation})`}
          >
            <circle r="28" fill="#0A0F22" />
            <circle r="22" fill="#1A2342" />
            <circle r="8" fill="#2A3357" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        <defs>
          <linearGradient id="boxShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(8,16,48,0.06)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(8,16,48,0.10)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating "live" pill */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          background: "rgba(8,16,48,0.55)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#3DF06E",
            boxShadow: "0 0 12px #3DF06E",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Routing leads — live
        </span>
      </div>

      {/* Floating mini-stat */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          padding: "12px 16px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-2)",
            fontWeight: 500,
          }}
        >
          Last lead
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
            marginTop: 2,
          }}
        >
          7 sec ago
        </div>
      </div>
    </div>
  );
};
