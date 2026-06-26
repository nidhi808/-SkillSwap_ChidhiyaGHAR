const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

let io = null
const activeUsers = new Map() // userId -> set of socketIds

function initSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        const allowed = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')
        if (!origin || allowed.includes(origin) || process.env.NODE_ENV !== 'production') {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
      methods: ['GET', 'POST']
    },
    pingTimeout: 60000,
    pingInterval: 25000
  })

  // Middleware: Authenticate Socket connection using JWT
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1]
      if (!token) return next(new Error('Authentication token missing.'))

      const { data: { user: supabaseUser }, error: authError } = await supabaseAdmin.auth.getUser(token)
      if (authError || !supabaseUser) {
        return next(new Error('Invalid or expired token.'))
      }

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('id, username, role')
        .eq('id', supabaseUser.id)
        .single()

      if (error || !user) return next(new Error('Invalid token.'))

      socket.user = user
      next()
    } catch (err) {
      logger.warn(`[Socket Auth] Failed connection: ${err.message}`)
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', (socket) => {
    const userId = socket.user.id
    logger.info(`[Socket] Client connected: ${socket.id} (User: ${userId})`)

    // 1. Presence tracking: join user-specific room
    socket.join(`user:${userId}`)
    if (!activeUsers.has(userId)) {
      activeUsers.set(userId, new Set())
    }
    activeUsers.get(userId).add(socket.id)

    // Broadcast online status
    socket.broadcast.emit('user_status', { userId, status: 'online' })

    // 2. Room subscriptions
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation:${conversationId}`)
      logger.debug(`[Socket] User ${userId} joined conversation room: ${conversationId}`)
    })

    socket.on('leave_conversation', (conversationId) => {
      socket.leave(`conversation:${conversationId}`)
      logger.debug(`[Socket] User ${userId} left conversation room: ${conversationId}`)
    })

    socket.on('join_session', (sessionId) => {
      socket.join(`session:${sessionId}`)
      logger.debug(`[Socket] User ${userId} joined session room: ${sessionId}`)
    })

    socket.on('leave_session', (sessionId) => {
      socket.leave(`session:${sessionId}`)
      logger.debug(`[Socket] User ${userId} left session room: ${sessionId}`)
    })

    // 3. Typing Indicators
    socket.on('typing', ({ conversationId, isTyping }) => {
      socket.to(`conversation:${conversationId}`).emit('typing', {
        conversationId,
        userId,
        isTyping
      })
    })

    // 4. Whiteboard drawings
    socket.on('whiteboard_draw', ({ sessionId, elements }) => {
      socket.to(`session:${sessionId}`).emit('whiteboard_draw', {
        elements,
        senderId: userId
      })
    })

    // 5. WebRTC Signaling (Simple fallback if needed)
    socket.on('webrtc_signal', ({ targetUserId, signal }) => {
      io.to(`user:${targetUserId}`).emit('webrtc_signal', {
        senderId: userId,
        signal
      })
    })

    // 6. Disconnect
    socket.on('disconnect', () => {
      logger.info(`[Socket] Client disconnected: ${socket.id}`)
      const socketSet = activeUsers.get(userId)
      if (socketSet) {
        socketSet.delete(socket.id)
        if (socketSet.size === 0) {
          activeUsers.delete(userId)
          // Broadcast offline status
          socket.broadcast.emit('user_status', { userId, status: 'offline' })
        }
      }
    })
  })

  // Expose io object in express app
  server.on('listening', () => {
    const app = server._events.request
    if (app && typeof app.set === 'function') {
      app.set('io', io)
    }
  })
}

function getIo() {
  return io
}

module.exports = {
  initSocketServer,
  getIo,
  activeUsers
}
