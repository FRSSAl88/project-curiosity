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

const endings = [
  "Want another strange discovery?",
  "Your curiosity level is increasing.",
  "The universe is getting weirder.",
  "There is always something hidden."
];

export function addPersonality(discovery) {
  if (!discovery) return null;

  const isRare = discovery.rarity === "rare";

  const introList = isRare
    ? rareIntroductions
    : introductions;

  const intro =
    introList[
      Math.floor(Math.random() * introList.length)
    ];

  const ending =
    endings[
      Math.floor(Math.random() * endings.length)
    ];

  return {
    ...discovery,
    displayText: `${intro}

${discovery.content.en}

${ending}`
  };
}