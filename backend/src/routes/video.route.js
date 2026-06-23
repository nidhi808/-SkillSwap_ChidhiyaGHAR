const express = require('express')
const router = express.Router()
const videoController = require('../controllers/video.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, normalLimiter)

router.get('/token/rtc', videoController.getRtcToken)
router.get('/token/rtm', videoController.getRtmToken)
router.get('/token/screenshare', videoController.getScreenShareToken)
router.get('/trtc-sig', videoController.getTrtcSig)

module.exports = router

