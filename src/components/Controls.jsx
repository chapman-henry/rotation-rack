export default function Controls({
  gameMode,
  setGameMode,
  ballSetKey,
  setBallSetKey,
  ballSets,
  onGenerate
}) {
  return (
    <div className="controls">
      <div className="mode-buttons">
        <button onClick={() => setGameMode("9-ball")}
          className={gameMode === "9-ball" ? "active" : ""}>
          9-Ball
        </button>
        <button onClick={() => setGameMode("10-ball")}
          className={gameMode === "10-ball" ? "active" : ""}>
          10-Ball
        </button>
      </div>

      <select
        value={ballSetKey}
        onChange={(e) => setBallSetKey(e.target.value)}
      >
        {Object.entries(ballSets).map(([key, set]) => (
          <option key={key} value={key}>
            {set.label}
          </option>
        ))}
      </select>

      <button className="generate-btn" onClick={onGenerate}>
        Generate
      </button>
    </div>
  );
}