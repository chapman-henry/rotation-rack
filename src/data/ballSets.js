/**
 * Ball set definitions for rotation-rack.
 *
 * Each key is a stable internal ID.
 * Each entry has:
 *   brand       – shown in the Brand dropdown
 *   model       – shown in the Model dropdown
 *   finish      – 'satin' | 'gloss' | 'high-gloss'  (controls SVG specular intensity)
 *   stripeWidth – half-height of the stripe as a fraction of ball radius (0 → 1)
 *   balls       – map of ball-number → { color, stripe }
 *
 * To add a new set: copy any entry, give it a unique key, and adjust the values.
 * "stripe: true" means the ball is a stripe ball (white base + colored band).
 * "stripe: false" means the ball is solid.
 */

const makeBalls = (colors) =>
  Object.fromEntries(
    Object.entries(colors).map(([num, color]) => [
      num,
      { color, stripe: Number(num) >= 9 },
    ])
  );

export const ballSets = {
  // ── Generic ────────────────────────────────────────────────────────────
  generic_standard: {
    brand: "Generic",
    model: "Standard",
    finish: "satin",
    stripeWidth: 0.44,
    balls: makeBalls({
      1: "#FFD700",
      2: "#1E40AF",
      3: "#DC2626",
      4: "#7C3AED",
      5: "#EA580C",
      6: "#16A34A",
      7: "#92400E",
      8: "#1F2937",
      9: "#FFD700",
      10: "#1E40AF",
    }),
  },

  // ── Aramith ────────────────────────────────────────────────────────────
  aramith_crown: {
    brand: "Aramith",
    model: "Crown Standard",
    finish: "gloss",
    stripeWidth: 0.43,
    balls: makeBalls({
      1: "#F5C018",
      2: "#1A3A9C",
      3: "#CC1B1B",
      4: "#7030AC",
      5: "#E55E00",
      6: "#0D8040",
      7: "#7C2020",
      8: "#1A1A1A",
      9: "#F5C018",
      10: "#1A3A9C",
    }),
  },

  aramith_super: {
    brand: "Aramith",
    model: "Super Pro",
    finish: "gloss",
    stripeWidth: 0.43,
    balls: makeBalls({
      1: "#F4B41A",
      2: "#1E3A8A",
      3: "#DC2626",
      4: "#7C3AED",
      5: "#EA580C",
      6: "#0D9488",
      7: "#991B1B",
      8: "#111111",
      9: "#F4B41A",
      10: "#1E3A8A",
    }),
  },

  aramith_premier: {
    brand: "Aramith",
    model: "Premier",
    finish: "high-gloss",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#F5C500",
      2: "#1530A0",
      3: "#C81818",
      4: "#6B28AB",
      5: "#E05200",
      6: "#0A7838",
      7: "#701818",
      8: "#101010",
      9: "#F5C500",
      10: "#1530A0",
    }),
  },

  aramith_tournament: {
    brand: "Aramith",
    model: "Tournament",
    finish: "high-gloss",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#FFB300",
      2: "#122CA0",
      3: "#BE1111",
      4: "#5E1E9C",
      5: "#DC4E00",
      6: "#076830",
      7: "#620F0F",
      8: "#0A0A0A",
      9: "#FFB300",
      10: "#122CA0",
    }),
  },

  // ── Cyclop ─────────────────────────────────────────────────────────────
  cyclop_galaxy: {
    brand: "Cyclop",
    model: "Galaxy",
    finish: "high-gloss",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#F8C200",
      2: "#1228A5",
      3: "#CC1515",
      4: "#6820A8",
      5: "#DE5000",
      6: "#0B7835",
      7: "#6E1515",
      8: "#111111",
      9: "#F8C200",
      10: "#1228A5",
    }),
  },

  cyclop_halcyon: {
    brand: "Cyclop",
    model: "Halcyon",
    finish: "high-gloss",
    stripeWidth: 0.41,
    balls: makeBalls({
      1: "#FFCA00",
      2: "#0E2299",
      3: "#D01010",
      4: "#611CA0",
      5: "#D84A00",
      6: "#087030",
      7: "#681010",
      8: "#0D0D0D",
      9: "#FFCA00",
      10: "#0E2299",
    }),
  },
};