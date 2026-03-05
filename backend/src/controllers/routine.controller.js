const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRoutine = async (req, res) => {
  try {
    const { aiInsights } = req.body;

    if (!aiInsights) {
      return res.status(400).json({ success: false, error: 'Missing AI insights data' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an expert life coach and behavioral psychologist.
      Based on the following insights about a user's current trajectory, create a detailed, realistic, and highly actionable daily routine that directly addresses their compounding risks to help them change course towards a better future.

      User Context & Insights:
      ${JSON.stringify(aiInsights, null, 2)}

      Output the response STRICTLY as a JSON object matching this schema:
      {
        "morning": ["action 1", "action 2", "action 3"],
        "afternoon": ["action 1", "action 2", "action 3"],
        "evening": ["action 1", "action 2", "action 3"],
        "guidelines": ["core rule 1", "core rule 2", "core rule 3", "core rule 4"]
      }

      Only provide the JSON object, absolutely no markdown formatting, no explanations.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let routineData;
    try {
      // Robust JSON extraction: find the first '{' and last '}'
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in response");
      }
      
      const jsonStr = jsonMatch[0];
      routineData = JSON.parse(jsonStr);
      
      // Ensure required structure exists
      if (!routineData.morning || !routineData.afternoon || !routineData.evening || !routineData.guidelines) {
         throw new Error("Missing required fields in parsed JSON");
      }
    } catch (parseError) {
      console.warn('Failed to parse Gemini routine response, using fallback:', parseError);
      console.log('Raw response was:', responseText);
      
      // Fallback data so the UI doesn't crash
      routineData = {
        morning: [
          "Wake up consistently at the same time to anchor circadian rhythm.",
          "Hydrate immediately with 16oz of water.",
          "Engage in 15 minutes of dynamic stretching or light movement."
        ],
        afternoon: [
          "Step away from the workspace for a dedicated 30-minute mental break.",
          "Complete the most cognitively demanding task early in the afternoon.",
          "Review daily progress and adjust tomorrow's priorities."
        ],
        evening: [
          "Implement a strict digital sunset 1 hour before bed.",
          "Prepare environment for tomorrow (clothes, workspace).",
          "Wind down with a non-screen activity like reading or journaling."
        ],
        guidelines: [
          "Never miss two days in a row of your core habits.",
          "Prioritize 7-8 hours of quality sleep over extra work.",
          "When feeling overwhelmed, focus only on the next immediate step.",
          "Treat your routine as an experiment: observe, adjust, improve."
        ]
      };
    }

    return res.status(200).json({
      success: true,
      data: routineData
    });

  } catch (error) {
    console.error('Error generating routine with Gemini:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate personalized action plan'
    });
  }
};

module.exports = {
  generateRoutine
};
