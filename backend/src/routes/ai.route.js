const express = require('express')
const router = express.Router()
const aiController = require('../controllers/ai.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { aiLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, aiLimiter)

router.get('/match-explanation/:targetUserId', aiController.getMatchExplanation)
router.post('/learning-path', aiController.createLearningPath)
router.post('/ask', aiController.askQuestion)

module.exports = router
