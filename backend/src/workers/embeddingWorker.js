const { generateEmbedding, buildProfileEmbeddingText } = require('../services/embedding.js')
const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

async function processEmbeddingJob(job) {
  const { type, userId } = job.data
  logger.info(`[Embedding Worker] Generating embedding for user ${userId} (Type: ${type})`)

  try {
    if (type === 'profile') {
      const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', userId).single()
      const { data: offered } = await supabaseAdmin.from('user_skills_offered').select('skills(name), proficiency_level').eq('user_id', userId)
      const { data: wanted } = await supabaseAdmin.from('user_skills_wanted').select('skills(name)').eq('user_id', userId)

      if (!profile) throw new Error('Profile not found')

      const text = buildProfileEmbeddingText(profile, offered || [], wanted || [])
      const embedding = await generateEmbedding(text)

      const { error } = await supabaseAdmin.from('profiles').update({ embedding }).eq('id', userId)
      if (error) throw error
    }
    return { success: true }
  } catch (err) {
    logger.error(`[Embedding Worker] Error: ${err.message}`)
    throw err
  }
}

module.exports = { processEmbeddingJob }
