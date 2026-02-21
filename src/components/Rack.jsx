import Ball from "./Ball";

export default function Rack({ rack, gameMode, ballSet }) {
  const ballSize = 56;
  const diameter = ballSize;
  const verticalSpacing = diameter * Math.cos(Math.PI / 6);
  const horizontalOffset = diameter * Math.sin(Math.PI / 6);

  const positions =
    gameMode === "9-ball"
      ? [
          { x: 0, y: 0 },
          { x: -horizontalOffset, y: verticalSpacing },
          { x: horizontalOffset, y: verticalSpacing },
          { x: -diameter, y: verticalSpacing * 2 },
          { x: 0, y: verticalSpacing * 2 },
          { x: diameter, y: verticalSpacing * 2 },
          { x: -horizontalOffset, y: verticalSpacing * 3 },
          { x: horizontalOffset, y: verticalSpacing * 3 },
          { x: 0, y: verticalSpacing * 4 }
        ]
      : [
          { x: 0, y: 0 },
          { x: -horizontalOffset, y: verticalSpacing },
          { x: horizontalOffset, y: verticalSpacing },
          { x: -diameter, y: verticalSpacing * 2 },
          { x: 0, y: verticalSpacing * 2 },
          { x: diameter, y: verticalSpacing * 2 },
          { x: -diameter - horizontalOffset, y: verticalSpacing * 3 },
          { x: -horizontalOffset, y: verticalSpacing * 3 },
          { x: horizontalOffset, y: verticalSpacing * 3 },
          { x: diameter + horizontalOffset, y: verticalSpacing * 3 }
        ];

  return (
    <div className="rack-container">
      {rack.map((num, i) => (
        <div
          key={i}
          className="ball-position"
          style={{
            left: `calc(50% + ${positions[i].x}px - ${ballSize / 2}px)`,
            top: `calc(50% + ${positions[i].y}px - ${ballSize / 2}px - 20px)`
          }}
        >
          <Ball number={num} ballData={ballSet[num]} />
        </div>
      ))}
    </div>
  );
}