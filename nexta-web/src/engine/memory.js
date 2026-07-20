const memory = {
  seenDiscoveries: [],
  categoryScores: {},
  interactionCount: 0
};

export function getMemory() {
  return memory;
}

export function updateMemory(discovery) {
  if (!discovery) return;

  memory.interactionCount++;

  if (!memory.seenDiscoveries.includes(discovery.id)) {
    memory.seenDiscoveries.push(discovery.id);
  }

  const category = discovery.category;

  if (!memory.categoryScores[category]) {
    memory.categoryScores[category] = 0;
  }

  memory.categoryScores[category]++;
}