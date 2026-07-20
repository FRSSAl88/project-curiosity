import { getMemory } from "./memory.js";
import { calculateScore } from "./scoring.js";
import { addPersonality } from "./personality.js";

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

  if (topChoices.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * topChoices.length
  );

  return addPersonality(topChoices[randomIndex]);
}