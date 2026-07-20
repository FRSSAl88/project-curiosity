export function calculateScore(discovery, memory) {
  let score = 0;

  const category = discovery.category;

  // Previous interest in this category
  if (memory.categoryScores[category]) {
    score += memory.categoryScores[category] * 2;
  }

  // User favorite category bonus
  if (
    memory.profile &&
    memory.profile.favoriteCategory === category
  ) {
    score += 10;
  }

  // New discoveries are preferred
  if (!memory.seenDiscoveries.includes(discovery.id)) {
    score += 5;
  } else {
    score -= 10;
  }

  // Difficulty value
  score += discovery.difficulty || 0;

  // Curiosity level bonus
  if (
    memory.profile &&
    memory.profile.curiosityLevel > 10
  ) {
    score += 3;
  }

  return score;
}