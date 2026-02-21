import { useState } from "react";
import { ballSets } from "./data/ballSets";
import { generateNineBallRack, generateTenBallRack } from "./utils/rackGenerators";
import Controls from "./components/Controls";
import Rack from "./components/Rack";

export default function App() {
  const [gameMode, setGameMode] = useState("9-ball");
  const [ballSetKey, setBallSetKey] = useState("default");
  const [rack, setRack] = useState(generateNineBallRack());

  const handleGenerate = () => {
    setRack(
      gameMode === "9-ball"
        ? generateNineBallRack()
        : generateTenBallRack()
    );
  };

  return (
    <div className="app">
      <h1>{gameMode === "9-ball" ? "9-Ball Rack" : "10-Ball Rack"}</h1>

      <Controls
        gameMode={gameMode}
        setGameMode={setGameMode}
        ballSetKey={ballSetKey}
        setBallSetKey={setBallSetKey}
        ballSets={ballSets}
        onGenerate={handleGenerate}
      />

      <Rack
        rack={rack}
        gameMode={gameMode}
        ballSet={ballSets[ballSetKey].balls}
      />
    </div>
  );
}