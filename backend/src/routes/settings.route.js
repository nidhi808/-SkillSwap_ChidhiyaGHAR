const express = require('express')
const router = express.Router()
const settingsController = require('../controllers/settings.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

router.get('/', settingsController.getSettings)
router.put('/', settingsController.updateSettings)

module.exports = router
