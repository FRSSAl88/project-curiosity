export function calculateScore(discovery, memory) {
  let score = 0;

  const category = discovery.category;

  if (memory.categoryScores[category]) {
    score += memory.categoryScores[category] * 2;
  }

  if (!memory.seenDiscoveries.includes(discovery.id)) {
    score += 5;
  } else {
    score -= 10;
  }

  score += discovery.difficulty || 0;
  return score;
}