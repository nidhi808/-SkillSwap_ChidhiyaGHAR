const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query
    const filters = {}

    let query = supabaseAdmin
      .from('users')
      .select('id, email, username, role, is_email_verified, is_banned, is_active, created_at')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`email.ilike.%${search}%,username.ilike.%${search}%`)
    }

    const from = (parseInt(page) - 1) * parseInt(limit)
    const to = from + parseInt(limit) - 1
    query = query.range(from, to)

    const { data, error, count } = await query
    if (error) throw error

    return res.status(200).json({
      data: data || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }
    })
  } catch (err) { next(err) }
}

// ✅ POST /api/admin/users/:userId/ban
const banUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { reason } = req.body

    const [updated] = await db.update('users', {
      is_banned: true,
      updated_at: new Date().toISOString()
    }, { id: userId })

    await db.insert('audit_logs', {
      user_id: req.user.id,
      action: 'user_ban',
      resource_type: 'user',
      resource_id: userId,
      ip_address: req.ip,
      details: { reason }
    })

    // Revoke all user sessions
    await supabaseAdmin.from('user_sessions').update({ is_active: false }).eq('user_id', userId)

    return res.status(200).json({ data: updated, message: 'User account suspended.' })
  } catch (err) { next(err) }
}

// ✅ POST /api/admin/users/:userId/unban
const unbanUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const [updated] = await db.update('users', {
      is_banned: false,
      updated_at: new Date().toISOString()
    }, { id: userId })

    await db.insert('audit_logs', {
      user_id: req.user.id,
      action: 'user_unban',
      resource_type: 'user',
      resource_id: userId,
      ip_address: req.ip
    })

    return res.status(200).json({ data: updated, message: 'User account restored.' })
  } catch (err) { next(err) }
}

// ✅ POST /api/admin/skills/:userSkillId/verify
const verifyUserSkill = async (req, res, next) => {
  try {
    const { userSkillId } = req.params

    const [updated] = await db.update('user_skills_offered', {
      is_verified: true,
      updated_at: new Date().toISOString()
    }, { id: userSkillId })

    // Award reputation points for verification
    if (updated) {
      await supabaseAdmin.rpc('increment_reputation', { user_id_input: updated.user_id, points_input: 30 }).catch(() => {})
      await db.insert('reputation_points', {
        user_id: updated.user_id, points: 30, action: 'skill_verified', reference_type: 'user_skill_offered', reference_id: userSkillId
      })
    }

    return res.status(200).json({ data: updated, message: 'Skill successfully verified.' })
  } catch (err) { next(err) }
}

// ✅ GET /api/admin/audit-logs
const getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query
    const result = await db.paginate('audit_logs', '*', {}, {
      page: parseInt(page),
      limit: parseInt(limit),
      orderBy: 'created_at',
      ascending: false
    })
    return res.status(200).json(result)
  } catch (err) { next(err) }
}

module.exports = {
  getUsers,
  banUser,
  unbanUser,
  verifyUserSkill,
  getAuditLogs
}
