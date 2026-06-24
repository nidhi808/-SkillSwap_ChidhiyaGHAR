const crypto = require('crypto')
const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

const TOKEN_EXPIRY_HOURS = 24

// ✅ Generate a secure email verification token
function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

// ✅ Create and store email verification token for a user
async function createEmailVerificationToken(userId) {
  const token = generateToken()
  const expires = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 3600 * 1000).toISOString()

  const { error } = await supabaseAdmin
    .from('users')
    .update({
      email_verification_token: token,
      email_verification_expires: expires
    })
    .eq('id', userId)

  if (error) throw error
  return token
}

// ✅ Verify email verification token
async function verifyEmailToken(token, userId) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, email_verification_token, email_verification_expires, is_email_verified')
    .eq('id', userId)
    .single()

  if (error || !user) return { success: false, message: 'User not found' }
  if (user.is_email_verified) return { success: true, message: 'Already verified' }
  if (user.email_verification_token !== token) return { success: false, message: 'Invalid token' }
  if (new Date(user.email_verification_expires) < new Date()) return { success: false, message: 'Token expired' }

  // Mark as verified
  await supabaseAdmin
    .from('users')
    .update({
      is_email_verified: true,
      email_verification_token: null,
      email_verification_expires: null
    })
    .eq('id', userId)

  return { success: true }
}

// ✅ Create password reset token
async function createPasswordResetToken(email) {
  const { data: user } = await supabaseAdmin.from('users').select('id').eq('email', email).single()
  if (!user) return null // Don't reveal whether email exists

  const token = generateToken()
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour

  await supabaseAdmin
    .from('users')
    .update({ password_reset_token: token, password_reset_expires: expires })
    .eq('id', user.id)

  return { token, userId: user.id }
}

// ✅ Verify and consume password reset token
async function verifyPasswordResetToken(token) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, password_reset_token, password_reset_expires')
    .eq('password_reset_token', token)
    .single()

  if (error || !user) return { success: false, message: 'Invalid token' }
  if (new Date(user.password_reset_expires) < new Date()) return { success: false, message: 'Token expired' }

  return { success: true, userId: user.id }
}

module.exports = {
  generateToken,
  createEmailVerificationToken,
  verifyEmailToken,
  createPasswordResetToken,
  verifyPasswordResetToken
}
