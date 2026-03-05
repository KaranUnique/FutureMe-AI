const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_testing',
});

exports.generateAIProjection = async (userData, baselineScores) => {
  const prompt = `You are a behavioral economist and career strategist.
Analyze the following structured lifestyle data and baseline scores.
Predict a 3-year trajectory.
Be realistic but constructive.
Avoid generic advice.
Return ONLY a valid JSON object with the following structure:
{
  "summary": "String (3-year projection summary)",
  "compoundingRisks": ["Array of strings"],
  "optimisticScenario": "String",
  "worstCaseScenario": "String",
  "behavioralImprovements": ["Array of 5 strings"],
  "letterFromFuture": "String (Short emotional paragraph from Future You, summarizing where they are, regrets if unchanged, achievements if improved)"
}

Data:
User Data: ${JSON.stringify(userData)}
Calculated Baseline Scores: ${JSON.stringify(baselineScores)}
`;

  try {
    // If no real API key is provided, return mock data (useful for hackathons/testing)
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return {
        summary: "Your current habits show a mixed trajectory. While your career focus is strong, your reliance on short sleep and high stress may lead to burnout.",
        compoundingRisks: [
          "Low sleep exacerbates stress levels",
          "High debt limits future financial flexibility",
          "Lack of exercise compounds long-term health risks"
        ],
        optimisticScenario: "If you prioritize recovery, your skill development will perfectly position you for a major career leap without the health toll.",
        worstCaseScenario: "Continued high stress and poor sleep lead to severe burnout, stalling career progress and increasing healthcare costs.",
        behavioralImprovements: [
          "Increase sleep to at least 7 hours",
          "Incorporate 30 mins of daily exercise",
          "Allocate 10% more income to debt repayment",
          "Implement strictly offline evening routines",
          "Diversify learning to include stress-management"
        ],
        letterFromFuture: "Hey, from three years down the line. I'm writing this hoping you'll listen. The late nights and stress almost broke us—I really regret not taking weekends off. But if you take those small steps for health now, I promise you, we end up leading that dream team and actually enjoying the success instead of being too exhausted to care."
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a behavioral economist and career strategist. Output only valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate AI projection");
  }
};
