const TLSSigAPIv2 = require('tls-sig-api-v2')
const logger = require('../utils/logger.js')

const SDK_APP_ID = parseInt(process.env.TRTC_SDK_APP_ID || '20043861', 10)
const SECRET_KEY = process.env.TRTC_SECRET_KEY

const EXPIRE_SECONDS = 86400 // 24 hours

/**
 * Generates a UserSig signature for a given user ID to authenticate in Tencent RTC.
 * @param {string} userId - The unique identifier of the user (UUID or username).
 * @returns {object} Contains sdkAppId, userSig, userId, and expiresAt.
 */
function generateUserSig(userId) {
  if (!SDK_APP_ID || !SECRET_KEY) {
    throw new Error('Tencent RTC credentials are not fully configured in environment variables')
  }

  try {
    const api = new TLSSigAPIv2.Api(SDK_APP_ID, SECRET_KEY)
    const userSig = api.genSig(userId, EXPIRE_SECONDS)

    logger.info(`[TRTC] Generated UserSig for user: ${userId}, SDKAppID: ${SDK_APP_ID}`)
    return {
      sdkAppId: SDK_APP_ID,
      userSig,
      userId,
      expiresAt: new Date(Date.now() + EXPIRE_SECONDS * 1000).toISOString()
    }
  } catch (err) {
    logger.error(`[TRTC] Failed to generate UserSig: ${err.message}`)
    throw err
  }
}

module.exports = {
  generateUserSig
}
