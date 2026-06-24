const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { strictLimiter, normalLimiter } = require('../services/rateLimitter.js')
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../middleware/validation.js')

// ✅ Public routes (strict rate limiting)
router.post('/register', strictLimiter, registerValidator, authController.register)
router.post('/login', strictLimiter, loginValidator, authController.login)
router.post('/logout', verifyToken, authController.logout)
router.post('/refresh', strictLimiter, authController.refreshToken)
router.post('/forgot-password', strictLimiter, forgotPasswordValidator, authController.forgotPassword)
router.post('/reset-password', strictLimiter, resetPasswordValidator, authController.resetPassword)
router.get('/verify-email', strictLimiter, authController.verifyEmail)
router.post('/resend-verification', strictLimiter, authController.resendVerification)

// ✅ OAuth
router.get('/oauth/:provider', strictLimiter, authController.initiateOAuth)
router.get('/oauth/:provider/callback', strictLimiter, authController.handleOAuthCallback)

// ✅ MFA
router.post('/mfa/setup', verifyToken, normalLimiter, authController.setupMfa)
router.post('/mfa/verify', verifyToken, strictLimiter, authController.verifyMfa)
router.post('/mfa/disable', verifyToken, strictLimiter, authController.disableMfa)

// ✅ Authenticated
router.get('/me', verifyToken, authController.getMe)
router.post('/change-password', verifyToken, strictLimiter, authController.changePassword)
router.get('/sessions', verifyToken, authController.getActiveSessions)
router.delete('/sessions/:sessionId', verifyToken, authController.revokeSession)
router.delete('/sessions', verifyToken, authController.revokeAllSessions)

module.exports = router
