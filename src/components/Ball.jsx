function darken(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

export default function Ball({ number, ballData }) {
  const { base, stripe } = ballData;

  return (
    <div className="ball">
      <div
        className="ball-surface"
        style={{
          background: stripe
            ? `linear-gradient(to bottom,
               #F5F5DC 0%,
               #F5F5DC 25%,
               ${base} 25%,
               ${base} 75%,
               #F5F5DC 75%,
               #F5F5DC 100%)`
            : `radial-gradient(circle at 35% 35%, ${base}, ${darken(base, -40)})`
        }}
      >
        <div className="ball-number">{number}</div>
      </div>
    </div>
  );
}