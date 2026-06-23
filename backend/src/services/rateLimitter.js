const rateLimit = require('express-rate-limit')

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 min default
const isDev = process.env.NODE_ENV !== 'production'
const skipAll = () => true

// ✅ Tier 1: Strict — auth endpoints (login, register, OTP, password reset)
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Rate limit exceeded. Please try again in 15 minutes.' },
  skipSuccessfulRequests: false,
  skip: skipAll
})

// ✅ Tier 2: Normal — standard API endpoints
const normalLimiter = rateLimit({
  windowMs,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Rate limit exceeded. Please try again later.' },
  skip: skipAll
})

// ✅ Tier 3: Relaxed — real-time / chat endpoints
const relaxedLimiter = rateLimit({
  windowMs,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Too many real-time requests.' },
  skip: skipAll
})

// ✅ Tier 4: AI — expensive AI endpoints
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many AI requests', message: 'AI rate limit exceeded. Please wait 10 minutes.' },
  skip: skipAll
})

// ✅ Tier 5: Dev — dev/testing
const devLimiter = rateLimit({
  windowMs,
  max: 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Dev rate limit exceeded.' },
  skip: skipAll
})

// ✅ Global fallback — applied at the app level
const globalLimiter = rateLimit({
  windowMs,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Global rate limit exceeded.' },
  skip: skipAll
})

// ✅ StrictDevLimiter — internal test endpoints
const StrictDevLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Strict dev rate limit exceeded.' },
  skip: skipAll
})

module.exports = {
  strictLimiter,
  normalLimiter,
  relaxedLimiter,
  aiLimiter,
  devLimiter,
  globalLimiter,
  StrictDevLimiter
}
