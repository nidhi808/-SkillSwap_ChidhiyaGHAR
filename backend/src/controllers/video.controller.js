const { generateRtcToken, generateRtmToken, generateScreenShareToken } = require('../services/agoraService.js')
const { generateUserSig } = require('../services/trtcService.js')
const logger = require('../utils/logger.js')

// Helper to convert UUID string into a 32-bit unsigned integer for Agora
function uuidToNumericUid(uuidStr) {
  let hash = 0
  if (!uuidStr) return hash
  for (let i = 0; i < uuidStr.length; i++) {
    const char = uuidStr.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// ✅ GET /api/video/token/rtc
const getRtcToken = async (req, res, next) => {
  try {
    const { channelName, role = 'publisher' } = req.query
    if (!channelName) return res.status(400).json({ error: 'channelName parameter is required.' })

    const numericUid = uuidToNumericUid(req.user.id)
    const tokenInfo = generateRtcToken(channelName, numericUid, role)

    return res.status(200).json({ data: tokenInfo })
  } catch (err) { next(err) }
}

// ✅ GET /api/video/token/rtm
const getRtmToken = async (req, res, next) => {
  try {
    const tokenInfo = generateRtmToken(req.user.id)
    return res.status(200).json({ data: tokenInfo })
  } catch (err) { next(err) }
}

// ✅ GET /api/video/token/screenshare
const getScreenShareToken = async (req, res, next) => {
  try {
    const { channelName } = req.query
    if (!channelName) return res.status(400).json({ error: 'channelName parameter is required.' })

    const numericUid = uuidToNumericUid(req.user.id)
    const tokenInfo = generateScreenShareToken(channelName, numericUid)

    return res.status(200).json({ data: tokenInfo })
  } catch (err) { next(err) }
}

// ✅ GET /api/video/trtc-sig
const getTrtcSig = async (req, res, next) => {
  try {
    const userId = req.user.id
    const sigInfo = generateUserSig(userId)
    return res.status(200).json({ data: sigInfo })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getRtcToken,
  getRtmToken,
  getScreenShareToken,
  getTrtcSig
}

