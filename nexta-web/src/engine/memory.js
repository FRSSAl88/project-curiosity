const memory = {
  totalClicks: 0,

  seenDiscoveries: [],

  categoryScores: {},

  lastDiscovery: null,

  rareCounter: 0
};

export function getMemory() {
  return memory;
}

export function updateMemory(discovery) {
  if (!discovery) return;

  memory.totalClicks++;
  memory.rareCounter++;

  if (!memory.seenDiscoveries.includes(discovery.id)) {
    memory.seenDiscoveries.push(discovery.id);
  }

  memory.lastDiscovery = discovery.id;

  const category = discovery.category;

  if (!memory.categoryScores[category]) {
    memory.categoryScores[category] = 0;
  }

  memory.categoryScores[category]++;
}

export function resetMemory() {
  memory.totalClicks = 0;
  memory.seenDiscoveries = [];
  memory.categoryScores = {};
  memory.lastDiscovery = null;
  memory.rareCounter = 0;
}