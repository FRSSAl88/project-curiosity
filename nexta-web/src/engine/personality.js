import { choosePersonality } from "./personalityAI.js";


const introductions = [
  "Nexta found something you probably didn't know.",
  "Your curiosity brought you here. Don't blame us.",
  "Warning: this fact may disturb your normal thinking.",
  "Another useless piece of knowledge you will remember forever."
];

const rareIntroductions = [
  "🔒 RARE DISCOVERY UNLOCKED.",
  "✨ You found something unusual.",
  "🚨 Nexta detected a rare piece of knowledge.",
  "🧠 This one doesn't appear often."
];

const categoryIntroductions = {

  animals: [
    "🐾 You seem curious about the wild side of knowledge.",
    "🦁 Nature has another secret for you."
  ],

  space: [
    "🌌 Looking beyond Earth today?",
    "🚀 The universe has something to show you."
  ],

  science: [
    "🔬 Your curiosity is entering science mode.",
    "🧪 Another mystery waiting to be explained."
  ],

  human: [
    "🧠 The human story is always surprising.",
    "👀 Let's explore what makes us unique."
  ]

};


const endings = [
  "Want another strange discovery?",
  "Your curiosity level is increasing.",
  "The universe is getting weirder.",
  "There is always something hidden."
];



export function addPersonality(discovery, memory) {

  if (!discovery) return null;


  const isRare =
    discovery.rarity === "rare";


  const userPersonality =
    choosePersonality();
if (
    memory &&
    memory.profile
) {
    memory.profile.addPersonality =
     userPersonality;
}

  let introList =
    introductions;



  // Rare has priority

  if (isRare) {

    introList =
      rareIntroductions;

  }



  // Category preference

  else if (
    memory &&
    memory.profile &&
    memory.profile.favoriteCategory === discovery.category &&
    categoryIntroductions[discovery.category]
  ) {

    introList =
      categoryIntroductions[discovery.category];

  }



  // Adaptive Personality

  if (userPersonality === "Funny") {

    introList = [
      "😄 Nexta thinks you need something weird today.",
      "😂 Knowledge arrived with a little chaos."
    ];

  }



  if (userPersonality === "Scientist") {

    introList = [
      "🔬 Let's investigate this discovery.",
      "🧠 Science mode activated."
    ];

  }



  if (userPersonality === "Minimal") {

    introList = [
      "⚡ Quick discovery."
    ];

  }



  if (userPersonality === "Explorer") {

    introList = [
      "🌍 Another hidden corner of knowledge."
    ];

  }



  const intro =
    introList[
      Math.floor(
        Math.random() * introList.length
      )
    ];



  const ending =
    endings[
      Math.floor(
        Math.random() * endings.length
      )
    ];



  return {

    ...discovery,

    displayText: `${intro}
${discovery.content.en}
${ending}`

  };

}