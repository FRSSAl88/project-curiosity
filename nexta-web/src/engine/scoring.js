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
  const curiosity =
    memory.profile?.curiosityLevel || 0;

  if (curiosity > 10) {
    score += 3;
  }


  // Discovery depth system
  if (discovery.depth === "surface") {
    score += 5;
  }

  if (
    discovery.depth === "deep" &&
    curiosity >= 10
  ) {
    score += 10;
  }

  if (
    discovery.depth === "hidden" &&
    curiosity >= 20
  ) {
    score += 15;
  }


  return score;
}