import { getMemory } from "./memory";
import { calculateScore } from "./scoring";

export function chooseDiscovery(discoveries) {
  if (!discoveries || discoveries.length === 0) {
    return null;
  }

  const memory = getMemory();

  const rankedDiscoveries = discoveries
    .filter((item) => item.active)
    .map((item) => ({
      ...item,
      score: calculateScore(item, memory),
    }))
    .sort((a, b) => b.score - a.score);

  const topChoices = rankedDiscoveries.slice(0, 3);

  const randomIndex = Math.floor(
    Math.random() * topChoices.length
  );

  return topChoices[randomIndex];
}