export function calculateScore(discovery, memory) {

  let score = 0;

  const category = discovery.category;


  // اهتمام المستخدم بالفئة
  if (memory.categoryScores[category]) {

    score += memory.categoryScores[category] * 2;

  }


  // الفئة المفضلة
  if (
    memory.profile &&
    memory.profile.favoriteCategory === category
  ) {

    score += 10;

  }



  // التعلم من Feedback
  if (
    memory.feedback &&
    memory.feedback.categoryFeedback[category]
  ) {

    const feedback =
      memory.feedback.categoryFeedback[category];


    score += feedback.likes * 5;

    score -= feedback.dislikes * 5;

  }



  // اكتشاف جديد
  if (
    !memory.seenDiscoveries.includes(discovery.id)
  ) {

    score += 8;

  } else {

    score -= 15;

  }



  // تقليل تكرار آخر اكتشاف
  if (
    memory.lastDiscovery === discovery.id
  ) {

    score -= 20;

  }



  // صعوبة المحتوى
  score += discovery.difficulty || 0;



  // مكافأة المحتوى النادر
  if (
    discovery.rarity === "rare"
  ) {

    score += 5;

  }



  // تنويع داخل نفس الفئة
  const categoryCount =
    memory.categoryScores[category] || 0;


  if (categoryCount > 5) {

    score -= 3;

  }



  // مستوى الفضول
  if (
    memory.profile &&
    memory.profile.curiosityLevel > 10
  ) {

    score += 3;

  }


  return score;
}