const express = require('express');
const router = express.Router();
const projectionController = require('../controllers/projection.controller');
const chatController = require('../controllers/chat.controller');
const routineController = require('../controllers/routine.controller');

router.post('/project', projectionController.generateProjection);
router.post('/chat', chatController.handleChatMessage);
router.post('/generate-routine', routineController.generateRoutine);

module.exports = router;
