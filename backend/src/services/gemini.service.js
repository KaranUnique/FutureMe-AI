const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

exports.generateChatResponse = async (history, message, userData) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return "I am the FutureMe AI assistant! Please add a valid Gemini API key to your .env file to chat with me. I can help answer questions about your future trajectory based on your data.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Convert history format if needed
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are the FutureMe AI assistant, a helpful and empathetic guide for the user's life trajectory. You have access to the following context about the user's current paths and habits: ${JSON.stringify(userData)}. Use this context to inform your advice, but keep your answers concise. If you don't have user data yet, just introduce yourself.` }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will be concise, helpful, and use their current trajectory data to provide personalized context." }]
        },
        ...formattedHistory
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with AI assistant.");
  }
};
