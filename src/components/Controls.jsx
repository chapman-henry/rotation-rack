/**
 * Controls bar for rotation-rack.
 *
 * The ball-set chooser is a two-level selector:
 *   1. Brand dropdown  — derived from ballSets metadata
 *   2. Model dropdown  — filtered to the selected brand
 *
 * Selecting a brand auto-selects the first model for that brand.
 */

export default function Controls({
  gameMode,
  setGameMode,
  ballSetKey,
  setBallSetKey,
  ballSets,
  onGenerate,
}) {
  // Derive an ordered, deduplicated brand list
  const brands = [...new Set(Object.values(ballSets).map((s) => s.brand))];

  // The brand that owns the currently-selected key
  const selectedBrand = ballSets[ballSetKey]?.brand ?? brands[0];

  // All models for the active brand
  const modelsForBrand = Object.entries(ballSets)
    .filter(([, s]) => s.brand === selectedBrand)
    .map(([key, s]) => ({ key, model: s.model }));

  const handleBrandChange = (brand) => {
    // Auto-select the first model in the new brand
    const firstKey = Object.entries(ballSets).find(([, s]) => s.brand === brand)?.[0];
    if (firstKey) setBallSetKey(firstKey);
  };

  return (
    <div className="controls">
      {/* ── Game mode ─────────────────────────────────────────────────── */}
      <div className="mode-buttons">
        <button
          onClick={() => setGameMode("9-ball")}
          className={gameMode === "9-ball" ? "active" : ""}
        >
          9-Ball
        </button>
        <button
          onClick={() => setGameMode("10-ball")}
          className={gameMode === "10-ball" ? "active" : ""}
        >
          10-Ball
        </button>
      </div>

      {/* ── Ball-set tree: Brand → Model ──────────────────────────────── */}
      <div className="ball-set-selector">
        <select
          aria-label="Ball set brand"
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          aria-label="Ball set model"
          value={ballSetKey}
          onChange={(e) => setBallSetKey(e.target.value)}
        >
          {modelsForBrand.map(({ key, model }) => (
            <option key={key} value={key}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* ── Generate ──────────────────────────────────────────────────── */}
      <button className="generate-btn" onClick={onGenerate}>
        Generate
      </button>
    </div>
  );
}
