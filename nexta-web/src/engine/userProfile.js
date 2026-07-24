import { getMemory } from "./memory.js";
import { choosePersonality } from "./personalityAI.js";
import { detectEmotion } from "./emotionAI.js";


export function buildUserProfile() {

  const memory = getMemory();

  const personality =
    choosePersonality();


  const emotion =
    detectEmotion();


  const favoriteCategory =
    memory.profile?.favoriteCategory ||
    null;


  const tags =
    memory.profile?.tagScores || {};


  const interests =
    Object.keys(tags)
      .sort(
        (a, b) =>
          tags[b] - tags[a]
      )
      .slice(0, 5);


  return {

    personality,

    emotion:
      emotion.emotion,

    emotionReasons:
      emotion.reasons,

    favoriteCategory,

    interests,

    curiosityLevel:
      memory.profile?.curiosityLevel || 0,

    behavior: {

      averageClickSpeed:
        memory.behavior?.averageClickSpeed || 0,

      totalClicks:
        memory.totalClicks || 0

    }

  };

}