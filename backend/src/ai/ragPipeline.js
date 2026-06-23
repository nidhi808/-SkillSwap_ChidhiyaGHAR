const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const { supabaseAdmin } = require('../config/supabaseClient')
const { generateEmbedding } = require('../services/embedding.js')
const logger = require('../utils/logger.js')

/**
 * Splits session notes or text documents and inserts/upserts them into vectors
 */
async function ingestSessionNotes(sessionId, userId, rawText) {
  try {
    if (!rawText) return

    // 1. Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    })
    const chunks = await splitter.splitText(rawText)

    // 2. Generate embeddings & insert for each chunk
    const inserts = []
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const embedding = await generateEmbedding(chunk)
      inserts.push({
        session_id: sessionId,
        user_id: userId,
        content: chunk,
        embedding,
        chunk_index: i
      })
    }

    if (inserts.length > 0) {
      const { error } = await supabaseAdmin.from('session_note_vectors').insert(inserts)
      if (error) throw error
    }

    logger.info(`[RAG Pipeline] Ingested session ${sessionId} notes: ${chunks.length} chunks`)
  } catch (err) {
    logger.error(`[RAG Pipeline] Ingest session notes error: ${err.message}`)
    throw err
  }
}

module.exports = { ingestSessionNotes }
