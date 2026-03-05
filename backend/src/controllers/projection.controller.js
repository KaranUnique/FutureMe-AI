const projectionService = require('../services/projection.service');

exports.generateProjection = async (req, res) => {
  try {
    const userData = req.body;
    
    // Basic validation
    if (!userData || !userData.age) {
      return res.status(400).json({ error: 'Missing user data' });
    }

    const projection = await projectionService.createProjection(userData);
    
    res.status(200).json({
      success: true,
      data: projection
    });
  } catch (error) {
    console.error('Error generating projection:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate projection',
      details: error.message 
    });
  }
};
