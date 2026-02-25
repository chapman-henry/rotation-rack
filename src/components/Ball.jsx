/**
 * SVG-based pool ball renderer.
 *
 * Renders a realistic-looking pool ball using:
 *   - Sphere shading: radial gradient anchored upper-left to dark lower-right
 *   - Specular highlight: bright oval near the apex
 *   - Stripe: horizontal band for balls 9-15 (white base + color band)
 *   - Number circle: white disk at centre with ball number
 *
 * The `finish` prop controls specular intensity:
 *   'satin'      → soft, low-gloss look (typical house balls)
 *   'gloss'      → standard Belgian billiard ball look
 *   'high-gloss' → tournament ball look — intense highlight & deep shadows
 */
function octagonPoints(cx, cy, r) {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 8;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

const SIZE = 56;
const R = SIZE / 2; // 28 px

const FINISH = {
  "high-gloss": { specPeak: 0.90, specR: "27%", rimDark: 0.58, ambient: 0.16 },
  gloss:        { specPeak: 0.74, specR: "30%", rimDark: 0.46, ambient: 0.21 },
  satin:        { specPeak: 0.46, specR: "34%", rimDark: 0.30, ambient: 0.28 },
};

export default function Ball({ number, ballData, finish, stripeWidth, numberRing, numberRingColor, fontFamily, fontWeight }) {
  const { color, stripe } = ballData;

  const fp = FINISH[finish] ?? FINISH.gloss;
  const stripeHalf = R * stripeWidth; // px each side of the equator

  // Unique gradient/clip IDs per ball number (numbers are unique in a rack)
  const uid = `b${number}`;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label={`Ball ${number}`}
      style={{ display: "block", filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.5))" }}
    >
      <defs>
        {/* ── Clip to circle ────────────────────────────────────────────── */}
        <clipPath id={`clip-${uid}`}>
          <circle cx={R} cy={R} r={R} />
        </clipPath>

        {/* ── Sphere shading ────────────────────────────────────────────── */}
        {/*   Centre of gradient is upper-left; edges fade to black         */}
        <radialGradient
          id={`shade-${uid}`}
          cx="37%" cy="31%" r="88%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="white" stopOpacity={fp.ambient} />
          <stop offset="44%"  stopColor="black" stopOpacity="0"          />
          <stop offset="100%" stopColor="black" stopOpacity={fp.rimDark} />
        </radialGradient>

        {/* ── Specular highlight ────────────────────────────────────────── */}
        {/*   Tight bright oval at the apex (upper-left ~1/3 of the ball)   */}
        <radialGradient
          id={`spec-${uid}`}
          cx="32%" cy="26%" r={fp.specR}
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="white" stopOpacity={fp.specPeak} />
          <stop offset="55%"  stopColor="white" stopOpacity="0.07"        />
          <stop offset="100%" stopColor="white" stopOpacity="0"           />
        </radialGradient>
      </defs>

      {/* ── All ball-surface art is clipped to a circle ──────────────── */}
      <g clipPath={`url(#clip-${uid})`}>
        {/* 1. Base fill */}
        <circle cx={R} cy={R} r={R} fill={stripe ? "#FDFAF0" : color} />

        {/* 2. Stripe band (stripe balls only) */}
        {stripe && (
          <rect
            x={0}
            y={R - stripeHalf}
            width={SIZE}
            height={stripeHalf * 2}
            fill={color}
          />
        )}

        {/* 3. Sphere shading — makes the flat circle look 3-D */}
        <circle cx={R} cy={R} r={R} fill={`url(#shade-${uid})`} />

        {/* 4. Specular highlight */}
        <circle cx={R} cy={R} r={R} fill={`url(#spec-${uid})`} />

        {/* 5. Number ring background shape */}
        {numberRing === "circle" && (
          <circle cx={R} cy={R} r={R * 0.45} fill={numberRingColor} />
        )}
        {numberRing === "octagon" && (
          <polygon points={octagonPoints(R, R, R * 0.45)} fill={numberRingColor} />
        )}

        {/* 6. White disc sits on top of the ring */}
        <circle cx={R} cy={R} r={R * 0.365} fill="white" opacity="0.95" />
      </g>

      {/* ── Thin outline to separate ball from background ────────────── */}
      <circle
        cx={R} cy={R} r={R - 0.75}
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1.5"
      />

      {/* ── Number text (rendered above clip group) ──────────────────── */}
      <text
        x={R}
        y={R}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={number >= 10 ? "10" : "12"}
        fontWeight={fontWeight}       // was hardcoded "bold"
        fontFamily={fontFamily}       // was hardcoded "Arial Black, ..."
        fill="#1a1a1a"
      >
        {number}
      </text>
    </svg>
  );
}
