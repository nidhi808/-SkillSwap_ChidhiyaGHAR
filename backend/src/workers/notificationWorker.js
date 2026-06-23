const { getIo } = require('../websocket/socketServer.js')
const { sendNotification } = require('../services/notificationService.js')
const logger = require('../utils/logger.js')

async function processNotificationJob(job) {
  const { userId, actorId, type, title, body, data } = job.data
  logger.info(`[Notification Worker] Dispatching notification to user ${userId} (Type: ${type})`)

  try {
    const io = getIo()
    await sendNotification({ userId, actorId, type, title, body, data }, io)
    return { success: true }
  } catch (err) {
    logger.error(`[Notification Worker] Dispatch failed: ${err.message}`)
    throw err
  }
}

module.exports = { processNotificationJob }
