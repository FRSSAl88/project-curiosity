import { getMemory } from "./memory.js";

export function detectEmotion() {

  const memory = getMemory();

  const clicks =
    memory.totalClicks || 0;

  const likes =
    memory.feedback?.likes || 0;

  const dislikes =
    memory.feedback?.dislikes || 0;

  const speed =
    memory.behavior?.averageClickSpeed || 0;

  let emotion = "Curious";

  const reasons = [];

  if (
    speed > 0 &&
    speed < 3000
  ) {

    emotion = "Fast Explorer";
    reasons.push("Fast clicking");

  }

  if (
    likes > dislikes + 5
  ) {

    emotion = "Focused";
    reasons.push("Positive feedback");

  }

  if (
    dislikes > likes + 5
  ) {

    emotion = "Restless";
    reasons.push("Many dislikes");

  }

  if (
    clicks > 50 &&
    likes > 10
  ) {

    emotion = "Playful";
    reasons.push("High activity");

  }

  if (
    clicks < 10
  ) {

    emotion = "New Visitor";
    reasons.push("Few interactions");

  }

  return {
    emotion,
    reasons
  };

}