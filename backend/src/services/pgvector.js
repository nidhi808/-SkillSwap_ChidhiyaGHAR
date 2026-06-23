const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

const EMBEDDING_DIMENSIONS = parseInt(process.env.OPENAI_EMBEDDING_DIMENSIONS || '1536')

// ✅ Upsert embeddings into any table with a vector column
async function upsertEmbedding(table, id, embedding, metadata = {}) {
  if (!Array.isArray(embedding) || embedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(`[pgvector] Invalid embedding dimension: expected ${EMBEDDING_DIMENSIONS}, got ${embedding?.length}`)
  }

  const { error } = await supabaseAdmin
    .from(table)
    .upsert({ id, embedding, ...metadata }, { onConflict: 'id' })

  if (error) {
    logger.error(`[pgvector] upsertEmbedding error on table ${table}: ${error.message}`)
    throw error
  }
  return true
}

// ✅ Semantic similarity search using pgvector cosine distance via RPC
async function queryByEmbedding(table, queryEmbedding, options = {}) {
  const { topK = 10, threshold = 0.7, filter = {} } = options

  if (!queryEmbedding || queryEmbedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error('[pgvector] Query embedding dimension mismatch')
  }

  const { data, error } = await supabaseAdmin.rpc('match_embeddings', {
    query_embedding: queryEmbedding,
    table_name: table,
    match_threshold: threshold,
    match_count: topK,
    filter_json: JSON.stringify(filter)
  })

  if (error) {
    logger.error(`[pgvector] queryByEmbedding error: ${error.message}`)
    throw error
  }
  return data || []
}

// ✅ Direct cosine similarity search (no RPC — uses ORDER BY <=>)
async function findSimilarUsers(queryEmbedding, { topK = 20, excludeUserId = null } = {}) {
  if (!queryEmbedding) throw new Error('[pgvector] queryEmbedding required')

  let query = supabaseAdmin
    .from('profiles')
    .select('id, full_name, avatar_url, bio, reputation_points, avg_rating, total_sessions')
    .not('embedding', 'is', null)
    .order('embedding <=> ' + `'[${queryEmbedding.join(',')}]'`, { ascending: true })
    .limit(topK)

  if (excludeUserId) {
    query = query.neq('id', excludeUserId)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// ✅ Find skills similar to a query embedding
async function findSimilarSkillOfferings(queryEmbedding, { topK = 20, excludeUserId = null } = {}) {
  if (!queryEmbedding) throw new Error('[pgvector] queryEmbedding required')

  let query = supabaseAdmin
    .from('user_skills_offered')
    .select(`
      id, user_id, proficiency_level, years_experience, description,
      skills (id, name, slug, category_id),
      profiles:user_id (id, full_name, avatar_url, avg_rating, reputation_points)
    `)
    .not('embedding', 'is', null)
    .limit(topK)

  if (excludeUserId) {
    query = query.neq('user_id', excludeUserId)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

module.exports = {
  upsertEmbedding,
  queryByEmbedding,
  findSimilarUsers,
  findSimilarSkillOfferings,
  EMBEDDING_DIMENSIONS
}
