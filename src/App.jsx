import { useState } from "react";
import { ballSets } from "./data/ballSets";
import {
  generateNineBallRack,
  generateTenBallRack
} from "./utils/rackGenerators";
import Controls from "./components/Controls";
import Rack from "./components/Rack";

export default function App() {
  const [gameMode, setGameMode] = useState("9-ball");
  const [ballSetKey, setBallSetKey] = useState("default");

  const generateRack = (mode) =>
    mode === "9-ball"
      ? generateNineBallRack()
      : generateTenBallRack();

  const [rack, setRack] = useState(generateRack("9-ball"));

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setRack(generateRack(mode));  // immediately synced
  };

  const handleGenerate = () => {
    setRack(generateRack(gameMode));
  };

  return (
    <div className="app">
      <h1>{gameMode === "9-ball" ? "9-Ball Rack" : "10-Ball Rack"}</h1>

      <Controls
        gameMode={gameMode}
        setGameMode={handleModeChange}
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