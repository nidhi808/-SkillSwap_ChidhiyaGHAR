const OpenAI = require('openai')
const logger = require('../utils/logger.js')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002'
const EMBEDDING_DIMENSIONS = parseInt(process.env.OPENAI_EMBEDDING_DIMENSIONS || '1536')
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

// ✅ Retry helper with exponential backoff
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function withRetry(fn, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === retries) throw err
      const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1)
      logger.warn(`[Embedding] Attempt ${attempt} failed, retrying in ${delay}ms: ${err.message}`)
      await sleep(delay)
    }
  }
}

// ✅ Generate embedding for a single text
async function generateEmbedding(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('[Embedding] Input must be a non-empty string')
  }

  // Truncate to avoid token limit (ada-002 supports 8191 tokens)
  const truncated = text.substring(0, 8000).trim()

  return withRetry(async () => {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: truncated
    })
    const embedding = response.data[0]?.embedding
    if (!embedding || embedding.length !== EMBEDDING_DIMENSIONS) {
      throw new Error(`[Embedding] Unexpected dimensions: got ${embedding?.length}, expected ${EMBEDDING_DIMENSIONS}`)
    }
    return embedding
  })
}

// ✅ Generate embeddings for multiple texts in batch
async function generateEmbeddingsBatch(texts, batchSize = 20) {
  if (!Array.isArray(texts) || texts.length === 0) {
    throw new Error('[Embedding] Input must be a non-empty array')
  }

  const results = []
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize).map(t => t.substring(0, 8000).trim())
    const response = await withRetry(() => openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch
    }))
    const embeddings = response.data.map(d => d.embedding)
    results.push(...embeddings)
    logger.info(`[Embedding] Batch ${Math.ceil((i + 1) / batchSize)} completed (${results.length}/${texts.length})`)
  }
  return results
}

// ✅ Build a rich text representation of a user profile for embedding
function buildProfileEmbeddingText(profile, skillsOffered = [], skillsWanted = []) {
  const parts = []
  if (profile.full_name) parts.push(`Name: ${profile.full_name}`)
  if (profile.bio) parts.push(`Bio: ${profile.bio}`)
  if (profile.location) parts.push(`Location: ${profile.location}`)
  if (skillsOffered.length) {
    parts.push(`Skills I teach: ${skillsOffered.map(s => `${s.skill_name} (${s.proficiency_level})`).join(', ')}`)
  }
  if (skillsWanted.length) {
    parts.push(`Skills I want to learn: ${skillsWanted.map(s => s.skill_name).join(', ')}`)
  }
  return parts.join('\n')
}

// ✅ Build embedding text for a skill offering
function buildSkillEmbeddingText(skillName, proficiencyLevel, description = '') {
  return [
    `Skill: ${skillName}`,
    `Proficiency: ${proficiencyLevel}`,
    description ? `Description: ${description}` : ''
  ].filter(Boolean).join('\n')
}

module.exports = {
  generateEmbedding,
  generateEmbeddingsBatch,
  buildProfileEmbeddingText,
  buildSkillEmbeddingText,
  EMBEDDING_DIMENSIONS
}
