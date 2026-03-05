/**
 * Calculates rule-based baseline scores out of 100
 */
exports.calculateBaselineScores = (data) => {
  const {
    age = 25,
    screenTime = 8,
    sleepHours = 6,
    exerciseFreq = 2,
    dietQuality = 5,
    savingsRate = 10,
    debtLevel = 5000,
    learningHours = 2,
    stressLevel = 7,
  } = data;

  // --- Health Risk Score (Lower is better, but we return a score where 0=bad, 100=good for consistency, wait, meter says "Risk")
  // Let's make all scores 0-100 where 100 is GOOD, except Burnout/Health Risk which might be inverted.
  // Actually, standardizing: 100 = High Risk for Health Risk & Burnout. 100 = Good for Stability & Career.

  let healthRisk =
    50 +
    (10 - dietQuality) * 2 +
    (8 - sleepHours) * 3 +
    (7 - exerciseFreq) * 2 +
    (screenTime - 4) * 1.5;
  healthRisk = Math.min(Math.max(healthRisk, 0), 100);

  // --- Financial Stability Score (100 is excellent)
  let financialStability = 50 + savingsRate * 1.5 - debtLevel / 1000; // Rough penalty for debt
  financialStability = Math.min(Math.max(financialStability, 0), 100);

  // --- Career Growth Score (100 is excellent)
  let careerGrowth =
    40 +
    learningHours * 3 +
    savingsRate * 0.5 - // financial buffer helps career risk
    stressLevel * 1.5;
  careerGrowth = Math.min(Math.max(careerGrowth, 0), 100);

  // --- Burnout Probability (100 is high probability)
  let burnoutRisk =
    30 + stressLevel * 4 + (8 - sleepHours) * 3 + (screenTime - 5) * 2;
  burnoutRisk = Math.min(Math.max(burnoutRisk, 0), 100);

  return {
    healthRisk: Math.round(healthRisk),
    financialStability: Math.round(financialStability),
    careerGrowth: Math.round(careerGrowth),
    burnoutRisk: Math.round(burnoutRisk),
  };
};

exports.calculateOverallStability = (scores) => {
  // Stability goes up with fin/career, goes down with health risk / burnout risk
  const stability =
    (scores.financialStability +
      scores.careerGrowth +
      (100 - scores.healthRisk) +
      (100 - scores.burnoutRisk)) /
    4;

  return Math.round(stability);
};
