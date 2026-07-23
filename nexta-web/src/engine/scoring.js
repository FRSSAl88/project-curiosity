export function calculateScore(discovery, memory) {
  let score = 0;

  const category = discovery.category;

  // Category interest
  if (memory.categoryScores[category]) {
    score += memory.categoryScores[category] * 2;
  }

  // Favorite category bonus
  if (
    memory.profile &&
    memory.profile.favoriteCategory === category
  ) {
    score += 10;
  }

  // Tag intelligence
  if (
    discovery.tags &&
    memory.profile &&
    memory.profile.tagScores
  ) {
    discovery.tags.forEach((tag) => {

      if (memory.profile.tagScores[tag]) {
        score += memory.profile.tagScores[tag] * 3;
      }

    });
  }

  // New discoveries bonus
  if (!memory.seenDiscoveries.includes(discovery.id)) {
    score += 5;
  } else {
    score -= 10;
  }

  // Difficulty
  score += discovery.difficulty || 0;

  // Curiosity bonus
  if (
    memory.profile &&
    memory.profile.curiosityLevel > 10
  ) {
    score += 3;
  }
// Diversity Engine
if (
  memory.lastDiscovery &&
  discovery.id !== memory.lastDiscovery
) {

  if (
    memory.lastDiscovery.category ===
    discovery.category
  ) {
    score -= 5;
  } else {
    score += 3;
  }

}

// Discovery Fatigue Engine
if (
  memory.recentDiscoveries &&
  memory.recentDiscoveries.length > 0
) {

  const recentCategoryCount =
    memory.recentDiscoveries.filter(
      (item) =>
        item.category === discovery.category
    ).length;


  if (recentCategoryCount >= 5) {
    score -= 10;
  }

  if (recentCategoryCount >= 8) {
    score -= 20;
  }
}

 return score;
}