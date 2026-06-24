const Queue = require('bull')
const logger = require('../utils/logger.js')

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const connectionOpts = {
  redis: {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
  }
}

// ✅ 1. Define Queues
const emailQueue = new Queue('email-queue', REDIS_URL, connectionOpts)
const embeddingQueue = new Queue('embedding-queue', REDIS_URL, connectionOpts)
const matchQueue = new Queue('match-queue', REDIS_URL, connectionOpts)
const notificationQueue = new Queue('notification-queue', REDIS_URL, connectionOpts)
const leaderboardQueue = new Queue('leaderboard-queue', REDIS_URL, connectionOpts)
const badgeQueue = new Queue('badge-queue', REDIS_URL, connectionOpts)

// ✅ 2. Register Processors (Workers)
function startWorkers() {
  logger.info('🚀 Starting background Bull workers...')

  // Process email queue
  emailQueue.process(async (job) => {
    const { processEmailJob } = require('./emailWorker.js')
    return await processEmailJob(job)
  })

  // Process embedding queue
  embeddingQueue.process(async (job) => {
    const { processEmbeddingJob } = require('./embeddingWorker.js')
    return await processEmbeddingJob(job)
  })

  // Process match queue
  matchQueue.process(async (job) => {
    const { processMatchJob } = require('./matchWorker.js')
    return await processMatchJob(job)
  })

  // Process notification queue
  notificationQueue.process(async (job) => {
    const { processNotificationJob } = require('./notificationWorker.js')
    return await processNotificationJob(job)
  })

  // Process leaderboard queue
  leaderboardQueue.process(async (job) => {
    const { processLeaderboardJob } = require('./leaderboardWorker.js')
    return await processLeaderboardJob(job)
  })

  // Process badge queue
  badgeQueue.process(async (job) => {
    const { processBadgeJob } = require('./badgeWorker.js')
    return await processBadgeJob(job)
  })

  // Setup recurring cron jobs
  setupCronJobs()
}

// ✅ 3. Setup Recurring Cron Jobs (e.g., leaderboard rebuilding every night)
async function setupCronJobs() {
  try {
    // Clear old repeatable jobs first
    const cleanJobs = await leaderboardQueue.getRepeatableJobs()
    for (const j of cleanJobs) {
      await leaderboardQueue.removeRepeatableByKey(j.key)
    }

    // Leaderboard rebuilding every 6 hours
    await leaderboardQueue.add({}, {
      repeat: { cron: '0 */6 * * *' }
    })

    // Batch AI matching job every midnight
    await matchQueue.add({}, {
      repeat: { cron: '0 0 * * *' }
    })

    logger.info('⏰ Recurring cron tasks scheduled successfully.')
  } catch (err) {
    logger.error(`[Workers] Failed to setup cron jobs: ${err.message}`)
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('[Workers] Shutting down workers gracefully...')
  await Promise.all([
    emailQueue.close(),
    embeddingQueue.close(),
    matchQueue.close(),
    notificationQueue.close(),
    leaderboardQueue.close(),
    badgeQueue.close()
  ])
  process.exit(0)
})

// Run directly if executed as main module
if (require.main === module) {
  startWorkers()
}

module.exports = {
  emailQueue,
  embeddingQueue,
  matchQueue,
  notificationQueue,
  leaderboardQueue,
  badgeQueue,
  startWorkers
}
