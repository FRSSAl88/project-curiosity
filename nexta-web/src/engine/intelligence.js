import { getMemory } from "./memory.js";
import { calculateScore } from "./scoring.js";
import { addPersonality } from "./personality.js";


export function chooseDiscovery(discoveries) {

  if (!discoveries || discoveries.length === 0) {
    return null;
  }


  const memory = getMemory();


  const activeDiscoveries = discoveries.filter(
    (item) => item.active
  );


  const rareDiscoveries = activeDiscoveries.filter(
    (item) => item.rarity === "rare"
  );


  const normalDiscoveries = activeDiscoveries.filter(
    (item) => item.rarity !== "rare"
  );


  let selectedPool = normalDiscoveries;


  let rareChance = 0.01;


  if (memory.totalClicks > 10) {
    rareChance = 0.10;
  }


  if (memory.totalClicks > 50) {
    rareChance = 0.25;
  }
 


  if (
    Math.random() < rareChance &&
    rareDiscoveries.length > 0
  ) {

 
    selectedPool = rareDiscoveries;
  
  }



  const rankedDiscoveries = selectedPool
 
  .map((item) => {

      const score = calculateScore(item, memory);

      return {

        ...item,
        score
      };

    })
    .sort((a, b) => b.score - a.score);

  const topChoices = rankedDiscoveries.slice(0, 3);


  if (topChoices.length === 0) {
    return null;
  }


  const selected =
    topChoices[
      Math.floor(
        Math.random() * topChoices.length
      )
    ];


const reasons = [];

reasons.push(`Category: ${selected.category}`);

if (selected.tags) {
  selected.tags.forEach((tag) => {
    reasons.push(`Tag: ${tag}`);
  });
}

reasons.push(`Score: ${selected.score}`);

if (selected.rarity === "rare") {
  reasons.push("⭐ Rare discovery");
}

  memory.decisionLog = {
    selected: selected.id,
    score: selected.score,
    reasons
  };


  return addPersonality(
    selected,
    memory
  );
}
