const aiService = require('./ai.service');
const { calculateBaselineScores, calculateOverallStability } = require('../utils/scoring.utils');

exports.createProjection = async (userData) => {
  // 1. Calculate rule-based baseline scores
  const baselineScores = calculateBaselineScores(userData);
  
  // Calculate overall index
  const overallStability = calculateOverallStability(baselineScores);
  baselineScores.overallStability = overallStability;

  // 2. Generate AI enhancements based on data and baseline
  const aiEnhancements = await aiService.generateAIProjection(userData, baselineScores);

  // 3. Construct current projection
  const currentPath = {
    scores: baselineScores,
    aiInsights: aiEnhancements
  };

  // 4. Generate "Improved Habits" mock baseline for toggle comparison
  // (In a real scenario, we might call the AI again or apply a delta)
  const improvedData = { ...userData };
  improvedData.sleepHours = Math.max((improvedData.sleepHours || 0) + 2, 8);
  improvedData.exerciseFreq = Math.max((improvedData.exerciseFreq || 0) + 3, 5);
  improvedData.stressLevel = Math.max((improvedData.stressLevel || 10) - 3, 2);
  
  const improvedScores = calculateBaselineScores(improvedData);
  improvedScores.overallStability = calculateOverallStability(improvedScores);

  return {
    currentPath,
    improvedPath: {
      scores: improvedScores,
      // For the hackathon, we can mock the improved insights or run a simpler version
      aiInsights: {
        summary: "By improving sleep, exercise, and managing stress, your trajectory shifts significantly towards long-term sustainable growth.",
        compoundingRisks: ["Minor risks of work-life imbalance if boundaries slip"],
        optimisticScenario: "Optimal health fuels rapid career progression and financial stability.",
        worstCaseScenario: "Slight delays in career goals due to re-balancing effort, but overall healthy.",
        letterFromFuture: "Hey, from three years down the line. Thank you. Those changes you made to prioritize sleep and health completely changed our life. We have the energy to tackle our goals, and the burnout is gone. We achieved more than we thought possible, and we are actually happy.",
        behavioralImprovements: aiEnhancements.behavioralImprovements // Keep same suggestions
      }
    }
  };
};
