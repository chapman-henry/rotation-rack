/**
 * SVG-based pool ball renderer.
 *
 * Fixes vs previous version:
 *   1. useId() for all SVG IDs — prevents gradient/clip collisions on mobile Chrome
 *   2. gradientUnits="userSpaceOnUse" with correctly converted absolute px coords.
 *      Conversion rule: objectBoundingBox percentage → multiply by diameter (56),
 *      NOT radius. Previous version accidentally multiplied by radius, halving all
 *      gradient coordinates and producing dark, muddy ball colors.
 */

import { useId } from "react";

const SIZE = 56;   // diameter
const R = SIZE / 2; // radius = 28

// Spec gradient radii: objectBoundingBox "27%" = 27% of 56 = 15.12px = R * 0.54
const FINISH = {
  "high-gloss": { specPeak: 0.90, specR: R * 0.54, rimDark: 0.58, ambient: 0.16 },
  gloss:        { specPeak: 0.74, specR: R * 0.60, rimDark: 0.46, ambient: 0.21 },
  satin:        { specPeak: 0.46, specR: R * 0.68, rimDark: 0.30, ambient: 0.28 },
};

function octagonPoints(cx, cy, r) {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 8;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

export default function Ball({
  number,
  ballData,
  finish = "gloss",
  stripeWidth = 0.43,
  numberRing = "none",
  numberRingColor = "#000000",
  fontFamily = '"Arial Black", "Arial Bold", Arial, sans-serif',
  fontWeight = "bold",
}) {
  const uid = useId();
  const { color, stripe } = ballData;

  const fp = FINISH[finish] ?? FINISH.gloss;
  const stripeHalf = R * stripeWidth;

  // Shade gradient focal point:
  //   objectBoundingBox cx="37%" cy="31%" → userSpaceOnUse cx = 37%*56, cy = 31%*56
  const gx = SIZE * 0.37; // 20.72px
  const gy = SIZE * 0.31; // 17.36px

  // Shade gradient radius:
  //   objectBoundingBox r="88%" → userSpaceOnUse r = 88%*56 = 49.28px = R*1.76
  const shadeR = R * 1.76;

  // Spec gradient focal point:
  //   objectBoundingBox cx="32%" cy="26%" → 32%*56, 26%*56
  const sx = SIZE * 0.32; // 17.92px
  const sy = SIZE * 0.26; // 14.56px

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label={`Ball ${number}`}
      style={{ display: "block", filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.5))" }}
    >
      <defs>
        {/* ── Clip to circle ────────────────────────────────────────── */}
        <clipPath id={`${uid}-clip`}>
          <circle cx={R} cy={R} r={R} />
        </clipPath>

        {/* ── Sphere shading gradient ───────────────────────────────── */}
        <radialGradient
          id={`${uid}-shade`}
          cx={gx} cy={gy} r={shadeR}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="white" stopOpacity={fp.ambient} />
          <stop offset="44%"  stopColor="black" stopOpacity="0"          />
          <stop offset="100%" stopColor="black" stopOpacity={fp.rimDark} />
        </radialGradient>

        {/* ── Specular highlight gradient ───────────────────────────── */}
        <radialGradient
          id={`${uid}-spec`}
          cx={sx} cy={sy} r={fp.specR}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="white" stopOpacity={fp.specPeak} />
          <stop offset="55%"  stopColor="white" stopOpacity="0.07"        />
          <stop offset="100%" stopColor="white" stopOpacity="0"           />
        </radialGradient>
      </defs>

      {/* ── All surface art clipped to circle ────────────────────────── */}
      <g clipPath={`url(#${uid}-clip)`}>
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

        {/* 3. Sphere shading */}
        <circle cx={R} cy={R} r={R} fill={`url(#${uid}-shade)`} />

        {/* 4. Specular highlight */}
        <circle cx={R} cy={R} r={R} fill={`url(#${uid}-spec)`} />

        {/* 5. Number ring (circle or octagon) */}
        {numberRing === "circle" && (
          <circle cx={R} cy={R} r={R * 0.45} fill={numberRingColor} />
        )}
        {numberRing === "octagon" && (
          <polygon points={octagonPoints(R, R, R * 0.45)} fill={numberRingColor} />
        )}

        {/* 6. White number disc */}
        <circle cx={R} cy={R} r={R * 0.365} fill="white" opacity="0.95" />
      </g>

      {/* ── Outline ──────────────────────────────────────────────────── */}
      <circle
        cx={R} cy={R} r={R - 0.75}
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1.5"
      />

      {/* ── Number text ──────────────────────────────────────────────── */}
      <text
        x={R}
        y={R}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={number >= 10 ? "10" : "12"}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        fill="#1a1a1a"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {number}
      </text>
    </svg>
  );
}