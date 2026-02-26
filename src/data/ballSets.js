/**
 * Ball set definitions for rotation-rack.
 *
 * Each key is a stable internal ID.
 * Each entry has:
 *   brand       – shown in the Brand dropdown
 *   model       – shown in the Model dropdown
 *   finish      – 'satin' | 'gloss' | 'high-gloss'  (controls SVG specular intensity)
 *   numberRing: "none",        // "none" | "circle" | "octagon"
 *   numberRingColor: "#000000", // almost always black
 *   fontStyle: "black",         // "black" | "bold" | "regular"
 *   fontFamily: "Arial Black",  // per-brand override
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
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
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
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
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
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.43,
    balls: makeBalls({
      1: "#f8ab1f",
      2: "#263884",
      3: "#d22624",
      4: "#1b134e",
      5: "#ef5d22",
      6: "#00442f",
      7: "#771216",
      8: "#151410",
      9: "#f8ab1f",
      10: "#263884",
    }),
  },
aramith_tournament: {
    brand: "Aramith",
    model: "Pro Cup",
    finish: "gloss",
    numberRing: "circle",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.43,
    balls: makeBalls({
      1: "#f8ab1f",
      2: "#263884",
      3: "#d22624",
      4: "#1b134e",
      5: "#ef5d22",
      6: "#00442f",
      7: "#771216",
      8: "#151410",
      9: "#f8ab1f",
      10: "#263884",
    }),
  },

  aramith_premier: {
    brand: "Aramith",
    model: "Premier",
    finish: "high-gloss",
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
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

  aramith_tournament_TV: {
    brand: "Aramith",
    model: "Pro Cup TV",
    finish: "high-gloss",
    numberRing: "circle",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#f59004",
      2: "#16486d",
      3: "#e20413",
      4: "#ff6266",
      5: "#f83f07",
      6: "#056741",
      7: "#9b360a",
      8: "#0e0e0e",
      9: "#f59004",
      10: "#16486d",
    }),
  },

  // ── Cyclop ─────────────────────────────────────────────────────────────
  cyclop_zeus: {
    brand: "Cyclop",
    model: "Zeus",
    finish: "high-gloss",
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#f19321",
      2: "#124771",
      3: "#e92634",
      4: "#5d3e5d",
      5: "#f74931",
      6: "#a2bd0e",
      7: "#5fae9b",
      8: "#08090d",
      9: "#f19321",
      10: "#124771",
    }),
  },

  cyclop_athena: {
    brand: "Cyclop",
    model: "Athena",
    finish: "high-gloss",
    numberRing: "none",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.42,
    balls: makeBalls({
      1: "#ffc803",
      2: "#2d44ac",
      3: "#cf2f49",
      4: "#fe7f94",
      5: "#ff6738",
      6: "#2e5c51",
      7: "#93523c",
      8: "#08090d",
      9: "#ffc803",
      10: "#2d44ac",
    }),
  },

  cyclop_hyperion: {
    brand: "Cyclop",
    model: "Hyperion",
    finish: "high-gloss",
    numberRing: "octagon",
    numerRingColor: "#000000",
    fontStyle: "black",
    fontFamily: "Arial Black",
    stripeWidth: 0.41,
    balls: makeBalls({
      1: "#fdb330",
      2: "#0a49b4",
      3: "#e81422",
      4: "#7b3283",
      5: "#fc4420",
      6: "#b4b732",
      7: "#6accdf",
      8: "#020002",
      9: "#fdb330",
      10: "#0a49b4",
    }),
  },
};
