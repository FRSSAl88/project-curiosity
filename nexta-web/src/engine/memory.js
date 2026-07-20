import { loadMemory, saveMemory } from "./storage.js";


const defaultMemory = {
  totalClicks: 0,

  seenDiscoveries: [],

  categoryScores: {},

  lastDiscovery: null,

  rareCounter: 0,

  profile: {
    favoriteCategory: null,
    curiosityLevel: 0
  },

  behavior: {
    sessionStart: Date.now(),
    lastClickTime: null,
    averageClickSpeed: 0
  },

  decisionLog: {
    selected: null,
    score: null,
    reasons: []
  },

  feedback: {
    likes: 0,
    dislikes: 0,
    categoryFeedback: {}
  }
};


const memory = loadMemory() || defaultMemory;



function save() {
  saveMemory(memory);
}



export function getMemory() {
  return memory;
}



export function updateMemory(discovery) {

  if (!discovery) return;


  const now = Date.now();


  if (memory.behavior.lastClickTime) {

    const clickDifference =
      now - memory.behavior.lastClickTime;


    memory.behavior.averageClickSpeed =
      Math.round(
        (
          memory.behavior.averageClickSpeed +
          clickDifference
        ) / 2
      );
  }


  memory.behavior.lastClickTime = now;


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


  memory.profile.curiosityLevel =
    memory.totalClicks;



  let highestCategory = null;
  let highestScore = 0;


  for (const item in memory.categoryScores) {

    if (
      memory.categoryScores[item] > highestScore
    ) {

      highestScore =
        memory.categoryScores[item];

      highestCategory = item;
    }
  }


  memory.profile.favoriteCategory =
    highestCategory;


  save();
}




export function updateFeedback(discovery, type) {

  if (!discovery) return;


  const category = discovery.category;


  if (type === "like") {
    memory.feedback.likes++;
  }


  if (type === "dislike") {
    memory.feedback.dislikes++;
  }



  if (!memory.feedback.categoryFeedback[category]) {

    memory.feedback.categoryFeedback[category] = {
      likes: 0,
      dislikes: 0
    };
  }



  if (type === "like") {

    memory.feedback.categoryFeedback[category].likes++;

  }


  if (type === "dislike") {

    memory.feedback.categoryFeedback[category].dislikes++;

  }


  save();
}




export function resetMemory() {

  Object.assign(
    memory,
    JSON.parse(JSON.stringify(defaultMemory))
  );


  save();
}
