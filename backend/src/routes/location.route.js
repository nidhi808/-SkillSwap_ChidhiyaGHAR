const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

router.get('/nearby', locationController.getNearbyUsers)

module.exports = router
