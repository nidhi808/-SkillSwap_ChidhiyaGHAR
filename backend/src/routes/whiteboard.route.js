const express = require('express')
const router = express.Router()
const whiteboardController = require('../controllers/whiteboard.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { relaxedLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, relaxedLimiter)

router.get('/:sessionId', whiteboardController.getWhiteboardState)
router.post('/:sessionId', whiteboardController.saveWhiteboardState)

module.exports = router
