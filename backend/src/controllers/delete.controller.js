const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ POST /api/delete/soft
const softDeleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id

    // Soft delete user (mark inactive and record deleted_at)
    await db.update('users', {
      is_active: false,
      deleted_at: new Date().toISOString()
    }, { id: userId })

    // Revoke sessions
    await supabaseAdmin.from('user_sessions').update({ is_active: false }).eq('user_id', userId)

    await db.insert('audit_logs', {
      user_id: userId,
      action: 'account_soft_delete',
      resource_type: 'user',
      resource_id: userId,
      ip_address: req.ip
    })

    return res.status(200).json({ message: 'Your account has been soft-deleted. You can reactivate by logging in within 30 days.' })
  } catch (err) { next(err) }
}

// ✅ DELETE /api/delete/hard (GDPR compliance)
const hardDeleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id

    logger.info(`[GDPR] Executing hard delete for user: ${userId}`)

    // 1. Delete all dependencies
    await db.delete('user_sessions', { user_id: userId }).catch(() => {})
    await db.delete('user_skills_offered', { user_id: userId }).catch(() => {})
    await db.delete('user_skills_wanted', { user_id: userId }).catch(() => {})
    await db.delete('education', { user_id: userId }).catch(() => {})
    await db.delete('experience', { user_id: userId }).catch(() => {})
    await db.delete('availability', { user_id: userId }).catch(() => {})
    await db.delete('reputation_points', { user_id: userId }).catch(() => {})
    await db.delete('user_badges', { user_id: userId }).catch(() => {})
    await db.delete('notification_preferences', { user_id: userId }).catch(() => {})
    await db.delete('user_settings', { user_id: userId }).catch(() => {})

    // Delete matches, reviews, follows, conversations where user is participant
    const { error: matchError } = await supabaseAdmin.from('matches').delete().or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
    if (matchError) logger.warn(`[GDPR] Failed to delete matches: ${matchError.message}`)

    const { error: followError } = await supabaseAdmin.from('user_follows').delete().or(`follower_id.eq.${userId},following_id.eq.${userId}`)
    if (followError) logger.warn(`[GDPR] Failed to delete follows: ${followError.message}`)

    const { error: reviewError } = await supabaseAdmin.from('reviews').delete().or(`reviewer_id.eq.${userId},reviewee_id.eq.${userId}`)
    if (reviewError) logger.warn(`[GDPR] Failed to delete reviews: ${reviewError.message}`)

    // Delete profile
    await db.delete('profiles', { id: userId })

    // Delete user
    await db.delete('users', { id: userId })

    return res.status(200).json({ message: 'Account and all associated data permanently deleted.' })
  } catch (err) { next(err) }
}

module.exports = {
  softDeleteAccount,
  hardDeleteAccount
}
