export function generateNineBallRack() {
  const available = [2, 3, 4, 5, 6, 7, 8];
  const shuffled = [...available].sort(() => Math.random() - 0.5);

  return [
    1,
    shuffled[0], shuffled[1],
    shuffled[2], 9, shuffled[3],
    shuffled[4], shuffled[5],
    shuffled[6]
  ];
}

export function generateTenBallRack() {
  const available = [2, 3, 4, 5, 6, 7, 8, 9];
  const shuffled = [...available].sort(() => Math.random() - 0.5);

  return [
    1,
    shuffled[0], shuffled[1],
    shuffled[2], 10, shuffled[3],
    shuffled[4], shuffled[5], shuffled[6], shuffled[7]
  ];
}