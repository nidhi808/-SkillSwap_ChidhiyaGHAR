const express = require('express')
const router = express.Router()
const analyticsController = require('../controllers/analytics.controller.js')
const { verifyToken, requireRole } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

// Platform stats require admin role
router.get('/platform', requireRole('admin'), analyticsController.getPlatformAnalytics)
router.get('/user/:userId', analyticsController.getUserAnalytics)

module.exports = router
