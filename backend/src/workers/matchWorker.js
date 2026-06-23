const { findTopMatches } = require('../services/matchingEngine.js')
const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

async function processMatchJob(job) {
  logger.info('[Match Worker] Running batch AI matching calculations...')

  try {
    // 1. Get all active users
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .is('deleted_at', null)
      .eq('is_active', true)

    if (error) throw error
    if (!users || users.length === 0) return { matchedCount: 0 }

    let savedMatchesCount = 0

    // 2. Pre-calculate matches for each user
    for (const user of users) {
      try {
        const matches = await findTopMatches(user.id, { limit: 10 })
        for (const match of matches) {
          // Check if match already exists
          const existing = await db.selectOne('matches', 'id', {
            user_a_id: user.id,
            user_b_id: match.userId
          })

          if (existing) continue

          await db.insert('matches', {
            user_a_id: user.id,
            user_b_id: match.userId,
            status: 'pending',
            match_score: match.matchScore,
            skill_similarity_score: match.skillSimilarityScore,
            availability_score: match.availabilityScore,
            reputation_score: match.reputationScore,
            expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString()
          })
          savedMatchesCount++
        }
      } catch (err) {
        logger.warn(`[Match Worker] Failed matching for user ${user.id}: ${err.message}`)
      }
    }

    logger.info(`[Match Worker] Completed batch matching. Saved ${savedMatchesCount} new match records.`)
    return { success: true, savedMatchesCount }
  } catch (err) {
    logger.error(`[Match Worker] Batch matching error: ${err.message}`)
    throw err
  }
}

module.exports = { processMatchJob }
