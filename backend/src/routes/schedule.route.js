const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/schedule.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

router.get('/calendar', scheduleController.getCalendarBookings)
router.get('/slots/:targetUserId', scheduleController.getAvailableSlots)

module.exports = router
