export function weightedRandom(record: Record<string, number>): string | null {
  const items = Object.entries(record)
    .filter(([_, weight]) => weight > 0);

  const totalWeight = items.reduce((total, [_, weight]) => total + weight, 0);

  if (totalWeight === 0) return null;

  let randomWeight = Math.random() * totalWeight;

  for (const [item, weight] of items) {
    randomWeight -= weight;
    if (randomWeight < 0) return item;
  }

  return null;
}
