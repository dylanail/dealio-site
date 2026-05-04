// Stylized SVG illustration — moving truck silhouette over brand gradient.
// Designed to fill the About section image placeholder. Replace with a real
// photograph by dropping a JPG into /public and swapping the <Image>.

export const MovingScene = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: 360,
      borderRadius: 24,
      overflow: "hidden",
      background:
        "linear-gradient(135deg, #4A7BFF 0%, #3068F8 32%, #1F4FE0 60%, #0E1A3D 100%)",
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

    {/* Glow accents */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(40% 30% at 80% 20%, rgba(255,255,255,0.12), transparent 60%)," +
          "radial-gradient(50% 40% at 20% 80%, rgba(8,16,48,0.4), transparent 70%)",
      }}
    />

    {/* Sun line at horizon */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "8%",
        right: "8%",
        bottom: "32%",
        height: 1,
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
      }}
    />

    {/* Truck silhouette */}
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMax meet"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "70%",
      }}
      aria-hidden
    >
      {/* Ground line */}
      <line
        x1="0"
        y1="320"
        x2="600"
        y2="320"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Truck shadow */}
      <ellipse
        cx="300"
        cy="328"
        rx="190"
        ry="6"
        fill="rgba(0,0,0,0.3)"
      />

      {/* Truck body — box */}
      <g>
        {/* Cargo box */}
        <rect
          x="180"
          y="170"
          width="220"
          height="140"
          rx="8"
          fill="#FFFFFF"
        />
        <rect
          x="180"
          y="170"
          width="220"
          height="140"
          rx="8"
          fill="url(#truckShade)"
        />

        {/* Box panel detail lines */}
        <line x1="252" y1="178" x2="252" y2="305" stroke="rgba(8,16,48,0.18)" strokeWidth="1.5"/>
        <line x1="324" y1="178" x2="324" y2="305" stroke="rgba(8,16,48,0.18)" strokeWidth="1.5"/>

        {/* Door handle line */}
        <rect x="284" y="220" width="24" height="40" rx="3" fill="none" stroke="rgba(8,16,48,0.25)" strokeWidth="1.5"/>

        {/* "DEALIO" label on truck */}
        <text
          x="290"
          y="200"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, system-ui"
          fontSize="13"
          fontWeight="800"
          fill="#3068F8"
          letterSpacing="2"
        >
          DEALIO
        </text>

        {/* Cab */}
        <path
          d="M400 200 L460 200 L490 230 L490 310 L400 310 Z"
          fill="#081030"
        />
        {/* Cab window */}
        <path
          d="M410 210 L460 210 L478 230 L410 230 Z"
          fill="#3068F8"
          opacity="0.9"
        />
        {/* Cab highlight */}
        <path
          d="M410 210 L424 210 L424 230 L410 230 Z"
          fill="rgba(255,255,255,0.5)"
        />

        {/* Wheels */}
        <circle cx="225" cy="312" r="22" fill="#081030"/>
        <circle cx="225" cy="312" r="10" fill="#2A3357"/>
        <circle cx="225" cy="312" r="3" fill="#FFFFFF"/>

        <circle cx="355" cy="312" r="22" fill="#081030"/>
        <circle cx="355" cy="312" r="10" fill="#2A3357"/>
        <circle cx="355" cy="312" r="3" fill="#FFFFFF"/>

        <circle cx="455" cy="312" r="22" fill="#081030"/>
        <circle cx="455" cy="312" r="10" fill="#2A3357"/>
        <circle cx="455" cy="312" r="3" fill="#FFFFFF"/>
      </g>

      {/* Boxes stacked behind */}
      <g opacity="0.85">
        {/* Tall stack */}
        <rect x="80" y="248" width="64" height="62" rx="3" fill="#1A2342"/>
        <rect x="80" y="200" width="64" height="48" rx="3" fill="#0E1A3D"/>
        <line x1="80" y1="220" x2="144" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <line x1="112" y1="200" x2="112" y2="248" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* Smaller box */}
        <rect x="500" y="270" width="56" height="40" rx="3" fill="#0E1A3D"/>
        <line x1="528" y1="270" x2="528" y2="310" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      </g>

      <defs>
        <linearGradient id="truckShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="100%" stopColor="rgba(8,16,48,0.12)"/>
        </linearGradient>
      </defs>
    </svg>

    {/* Floating "live" pill — adds product-feel hint */}
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
