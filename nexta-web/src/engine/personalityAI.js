import { getMemory } from "./memory.js";


export function choosePersonality() {

  const memory = getMemory();

  const reasons = [];

  const curiosity =
    memory.profile?.curiosityLevel || 0;

  const speed =
    memory.behavior?.averageClickSpeed || 0;

  const favorite =
    memory.profile?.favoriteCategory;


  let personality = "Explorer";


  if (
    speed > 0 &&
    speed < 3000 &&
    curiosity > 20
  ) {

    personality = "Minimal";
    reasons.push("Fast clicking behavior");

  }


  else if (
    favorite === "science" ||
    favorite === "space"
  ) {

    personality = "Scientist";
    reasons.push(
      "Science/Space interest"
    );

  }


  else if (
    favorite === "animals" ||
    favorite === "fun"
  ) {

    personality = "Funny";
    reasons.push(
      "Animals/Fun interest"
    );

  }


  else {

    reasons.push(
      "Default explorer mode"
    );

  }


  memory.profile.personality =
    personality;


  memory.profile.personalityReasons =
    reasons;


  return personality;
}
