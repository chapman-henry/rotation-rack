import Ball from "./Ball";

/**
 * Renders a pool rack (9-ball or 10-ball) by positioning Ball components
 * in a diamond/triangle arrangement.
 *
 * Props:
 *   rack     – ordered array of ball numbers (e.g. [1, 4, 2, ...])
 *   gameMode – "9-ball" | "10-ball"
 *   ballSet  – full set object from ballSets.js (balls, finish, stripeWidth)
 */
export default function Rack({ rack, gameMode, ballSet }) {
  const { balls, finish = "gloss", stripeWidth = 0.43 } = ballSet;

  const ballSize = 56;
  const R = ballSize / 2;
  const verticalSpacing = ballSize * Math.cos(Math.PI / 6);   // ≈ 48.5 px
  const horizontalOffset = ballSize * Math.sin(Math.PI / 6);  // ≈ 28 px

  const positions =
    gameMode === "9-ball"
      ? [
          { x: 0,                      y: 0                   },
          { x: -horizontalOffset,      y: verticalSpacing     },
          { x:  horizontalOffset,      y: verticalSpacing     },
          { x: -ballSize,              y: verticalSpacing * 2 },
          { x: 0,                      y: verticalSpacing * 2 },
          { x:  ballSize,              y: verticalSpacing * 2 },
          { x: -horizontalOffset,      y: verticalSpacing * 3 },
          { x:  horizontalOffset,      y: verticalSpacing * 3 },
          { x: 0,                      y: verticalSpacing * 4 },
        ]
      : [
          { x: 0,                              y: 0                   },
          { x: -horizontalOffset,              y: verticalSpacing     },
          { x:  horizontalOffset,              y: verticalSpacing     },
          { x: -ballSize,                      y: verticalSpacing * 2 },
          { x: 0,                              y: verticalSpacing * 2 },
          { x:  ballSize,                      y: verticalSpacing * 2 },
          { x: -ballSize - horizontalOffset,   y: verticalSpacing * 3 },
          { x: -horizontalOffset,              y: verticalSpacing * 3 },
          { x:  horizontalOffset,              y: verticalSpacing * 3 },
          { x:  ballSize + horizontalOffset,   y: verticalSpacing * 3 },
        ];

  return (
    <div className="rack-container">
      {rack.slice(0, positions.length).map((num, i) =>
        balls[num] ? (
          <div
            key={i}
            className="ball-position"
            style={{
              left: `calc(50% + ${positions[i].x}px - ${R}px)`,
              top:  `calc(50% + ${positions[i].y}px - ${R}px - 20px)`,
            }}
          >
            <Ball
              number={num}
              ballData={balls[num]}
              finish={finish}
              stripeWidth={stripeWidth}
            />
          </div>
        ) : null
      )}
    </div>
  );
}
