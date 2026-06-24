const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

router.get('/', feedController.getActivityFeed)
router.post('/', feedController.createActivityPost)
router.get('/trending', feedController.getTrendingSkills)

module.exports = router
