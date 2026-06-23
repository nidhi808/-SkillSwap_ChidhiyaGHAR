const { evaluateUserBadges } = require('../services/badgeEngine.js')
const logger = require('../utils/logger.js')

async function processBadgeJob(job) {
  const { userId } = job.data
  logger.info(`[Badge Worker] Evaluating badge qualifications for user ${userId}`)

  try {
    const awarded = await evaluateUserBadges(userId)
    logger.info(`[Badge Worker] Finished evaluation. Awarded ${awarded.length} new badges to user ${userId}`)
    return { success: true, awarded: awarded.map(b => b.name) }
  } catch (err) {
    logger.error(`[Badge Worker] Evaluation failed: ${err.message}`)
    throw err
  }
}

module.exports = { processBadgeJob }
