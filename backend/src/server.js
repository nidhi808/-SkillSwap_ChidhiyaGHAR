const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const { createServer } = require('http')
const Sentry = require('@sentry/node')

// ✅ Load env FIRST before any other imports
dotenv.config()

// ✅ Strip surrounding quotes (Docker --env-file compatibility)
const getEnv = (key, defaultValue = '') => {
  const val = process.env[key] || defaultValue
  return typeof val === 'string' ? val.replace(/^["']|["']$/g, '').trim() : val
}

// ✅ Validate critical env vars on startup
const requiredEnv = ['JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_ANON_KEY']
const missingEnv = requiredEnv.filter(k => !process.env[k])
if (missingEnv.length > 0) {
  console.error(`[Startup Error] Missing env vars: ${missingEnv.join(', ')}`)
  process.exit(1)
}

// ✅ Import routes AFTER dotenv.config()
const authRoutes = require('./routes/auth.route.js')
const profileRoutes = require('./routes/profile.route.js')
const skillsRoutes = require('./routes/skills.route.js')
const matchingRoutes = require('./routes/matching.route.js')
const chatRoutes = require('./routes/chat.route.js')
const sessionsRoutes = require('./routes/sessions.route.js')
const reviewsRoutes = require('./routes/reviews.route.js')
const notificationsRoutes = require('./routes/notifications.route.js')
const badgesRoutes = require('./routes/badges.route.js')
const leaderboardRoutes = require('./routes/leaderboard.route.js')
const feedRoutes = require('./routes/feed.route.js')
const aiRoutes = require('./routes/ai.route.js')
const videoRoutes = require('./routes/video.route.js')
const whiteboardRoutes = require('./routes/whiteboard.route.js')
const scheduleRoutes = require('./routes/schedule.route.js')
const adminRoutes = require('./routes/admin.route.js')
const analyticsRoutes = require('./routes/analytics.route.js')
const settingsRoutes = require('./routes/settings.route.js')
const deleteRoutes = require('./routes/delete.route.js')
const locationRoutes = require('./routes/location.route.js')

const { globalLimiter } = require('./services/rateLimitter.js')
const { initSocketServer } = require('./websocket/socketServer.js')
const logger = require('./utils/logger.js')

// ✅ Sentry init (error tracking)
if (getEnv('SENTRY_DSN')) {
  Sentry.init({
    dsn: getEnv('SENTRY_DSN'),
    environment: getEnv('NODE_ENV', 'development'),
    tracesSampleRate: 0.1
  })
}

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT || 4000

// ✅ Initialize Socket.IO
initSocketServer(httpServer)

// ✅ Trust proxy (Nginx / Vercel / AWS ELB)
app.set('trust proxy', 1)

// ✅ CORS: reflect incoming Origin dynamically
const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins in dev, restrict in production
    const allowedOrigins = (getEnv('FRONTEND_URL') || 'http://localhost:5173').split(',')
    if (!origin || allowedOrigins.includes(origin) || getEnv('NODE_ENV') !== 'production') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// ✅ Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ['*'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.disable('x-powered-by')

// ✅ HTTP request logger (Morgan)
app.use(morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) },
  skip: (req) => req.path === '/health'
}))

// ✅ Request logger with origin
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} from ${req.headers.origin || 'unknown'}`)
  res.setHeader('X-Server-Env', getEnv('NODE_ENV', 'local'))
  next()
})

// ✅ Auth debug logger
app.use((req, res, next) => {
  const isDebug = getEnv('AUTH_DEBUG') === 'true' || getEnv('NODE_ENV') !== 'production'
  if (isDebug && req.path.startsWith('/api/auth')) {
    console.log('[Auth Debug] Authorization:', req.headers.authorization ? 'Present' : 'none')
    console.log('[Auth Debug] Cookies:', Object.keys(req.cookies || {}))
  }
  next()
})

// ✅ Global rate limiter
app.use(globalLimiter)

// ✅ Prometheus metrics endpoint
const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ timeout: 5000 })
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

// ✅ Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SkillSwap server is running!',
    timestamp: new Date().toISOString(),
    environment: getEnv('NODE_ENV', 'development'),
    version: require('../package.json').version
  })
})

// ✅ Mount all routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/matching', matchingRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/badges', badgesRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/whiteboard', whiteboardRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/delete', deleteRoutes)
app.use('/api/location', locationRoutes)

// ✅ Sentry error handler (must be before global error handler)
if (getEnv('SENTRY_DSN')) {
  app.use(Sentry.Handlers.errorHandler())
}

// ✅ Global error handler
app.use((err, req, res, next) => {
  logger.error(`[Error] ${err.message}`, { stack: err.stack, path: req.path })
  console.error(err.stack)
  const statusCode = err.statusCode || err.status || 500
  res.status(statusCode).json({
    error: err.name || 'InternalServerError',
    message: getEnv('NODE_ENV') === 'production' ? 'Internal server error' : err.message,
    ...(getEnv('NODE_ENV') === 'development' && { stack: err.stack })
  })
})

// ✅ 404 fallback
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl })
})

// ✅ Conditional listener — supports Vercel serverless
if (require.main === module) {
  httpServer.listen(PORT, () => {
    console.log(`🚀 SkillSwap server running on port ${PORT}`)
    console.log(`🌍 Environment: ${getEnv('NODE_ENV', 'development')}`)
    console.log(`📡 Socket.IO enabled`)
    console.log(`🔗 Health: http://localhost:${PORT}/health`)
  })
}

// ✅ Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Shutdown] SIGTERM received. Closing server gracefully...')
  httpServer.close(() => {
    console.log('[Shutdown] HTTP server closed.')
    process.exit(0)
  })
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UnhandledRejection]', reason)
  logger.error('[UnhandledRejection]', { reason })
})

process.on('uncaughtException', (err) => {
  console.error('[UncaughtException]', err.message)
  logger.error('[UncaughtException]', { message: err.message, stack: err.stack })
  process.exit(1)
})

module.exports = app
