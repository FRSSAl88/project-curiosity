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

      const score =
        calculateScore(item, memory);


      return {

        ...item,

        score

      };

    })


    .sort(
      (a, b) =>
        b.score - a.score
    );




  const topChoices =
    rankedDiscoveries.slice(0, 3);



  if (topChoices.length === 0) {
    return null;
  }




  const randomIndex =
    Math.floor(
      Math.random() *
      topChoices.length
    );



  const selected =
    topChoices[randomIndex];




  // Save decision explanation

  memory.decisionLog.selected =
    selected.id;


  memory.decisionLog.score =
    selected.score;



  memory.decisionLog.reasons = [];



  if (
    memory.categoryScores[selected.category]
  ) {

    memory.decisionLog.reasons.push(
      "User showed interest in this category"
    );

  }



  if (
    !memory.seenDiscoveries.includes(
      selected.id
    )
  ) {

    memory.decisionLog.reasons.push(
      "New discovery"
    );

  }



  if (
    selected.rarity === "rare"
  ) {

    memory.decisionLog.reasons.push(
      "Rare discovery bonus"
    );

  }



  if (
    memory.profile.curiosityLevel > 10
  ) {

    memory.decisionLog.reasons.push(
      "High curiosity level"
    );

  }



  return addPersonality(
    selected,
    memory
  );

}
