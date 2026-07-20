const introductions = [
  "Nexta found something you probably didn't know.",
  "Your curiosity brought you here. Don't blame us.",
  "Warning: this fact may change how you see the world.",
  "Another useless piece of knowledge you will remember forever."
];

const endings = [
  "Want another strange discovery?",
  "Your curiosity level is increasing.",
  "The universe is getting weirder.",
  "There is always something hidden."
];

export function addPersonality(discovery) {
  if (!discovery) {
    return null;
  }

  const intro =
    introductions[
      Math.floor(Math.random() * introductions.length)
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