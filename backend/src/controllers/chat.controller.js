const geminiService = require('../services/gemini.service');

exports.handleChatMessage = async (req, res) => {
  try {
    const { history = [], message, userData = null } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Missing message' });
    }

    const reply = await geminiService.generateChatResponse(history, message, userData);
    
    res.status(200).json({
      success: true,
      data: reply
    });
  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
};
