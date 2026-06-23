const { rebuildLeaderboard } = require('../services/leaderboardService.js')
const logger = require('../utils/logger.js')

async function processLeaderboardJob(job) {
  logger.info('[Leaderboard Worker] Rebuilding Redis cached leaderboards...')
  try {
    await rebuildLeaderboard()
    return { success: true }
  } catch (err) {
    logger.error(`[Leaderboard Worker] Rebuild failed: ${err.message}`)
    throw err
  }
}

module.exports = { processLeaderboardJob }
