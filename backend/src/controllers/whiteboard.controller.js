const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/whiteboard/:sessionId
const getWhiteboardState = async (req, res, next) => {
  try {
    const { sessionId } = req.params
    const userId = req.user.id

    // Verify session participation
    const session = await db.selectOne('learning_sessions', 'id, host_id, participant_id', { id: sessionId })
    if (!session) return res.status(404).json({ error: 'Session not found.' })
    if (session.host_id !== userId && session.participant_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to access this whiteboard.' })
    }

    const state = await db.selectOne('whiteboards', '*', { session_id: sessionId })
    return res.status(200).json({ data: state || { session_id: sessionId, elements: [] } })
  } catch (err) { next(err) }
}

// ✅ POST /api/whiteboard/:sessionId
const saveWhiteboardState = async (req, res, next) => {
  try {
    const { sessionId } = req.params
    const { elements } = req.body // Array of whiteboard element objects
    const userId = req.user.id

    if (!elements) return res.status(400).json({ error: 'Elements array is required.' })

    // Verify session participation
    const session = await db.selectOne('learning_sessions', 'id, host_id, participant_id', { id: sessionId })
    if (!session) return res.status(404).json({ error: 'Session not found.' })
    if (session.host_id !== userId && session.participant_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized.' })
    }

    const [saved] = await db.upsert('whiteboards', {
      session_id: sessionId,
      elements,
      updated_at: new Date().toISOString()
    }, { onConflict: 'session_id' })

    // Broadcast whiteboard state change to other participants in session
    const otherId = session.host_id === userId ? session.participant_id : session.host_id
    const io = req.app.get('io')
    if (io) {
      io.to(`session:${sessionId}`).emit('whiteboard_update', { elements, senderId: userId })
    }

    return res.status(200).json({ data: saved, message: 'Whiteboard state saved.' })
  } catch (err) { next(err) }
}

module.exports = {
  getWhiteboardState,
  saveWhiteboardState
}
