const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

// ✅ Platform-level stats for admin dashboard
async function getPlatformStats() {
  try {
    const [
      { count: totalUsers },
      { count: totalSessions },
      { count: totalMatches },
      { count: totalMessages },
      { count: activeUsers }
    ] = await Promise.all([
      supabaseAdmin.from('users').select('id', { count: 'exact', head: true }).is('deleted_at', null),
      supabaseAdmin.from('learning_sessions').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
      supabaseAdmin.from('matches').select('id', { count: 'exact', head: true }).eq('status', 'accepted'),
      supabaseAdmin.from('messages').select('id', { count: 'exact', head: true }).is('deleted_at', null),
      supabaseAdmin.from('users').select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString())
    ])

    return { totalUsers, totalSessions, totalMatches, totalMessages, activeUsersLast30d: activeUsers }
  } catch (err) {
    logger.error(`[Analytics] getPlatformStats error: ${err.message}`)
    throw err
  }
}

// ✅ User growth over time (last N days)
async function getUserGrowthTimeSeries(days = 30) {
  try {
    const since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString()
    const { data } = await supabaseAdmin
      .from('users')
      .select('created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: true })

    if (!data) return []

    // Group by date
    const grouped = {}
    data.forEach(u => {
      const date = u.created_at.substring(0, 10)
      grouped[date] = (grouped[date] || 0) + 1
    })

    return Object.entries(grouped).map(([date, count]) => ({ date, count }))
  } catch (err) {
    logger.error(`[Analytics] getUserGrowthTimeSeries error: ${err.message}`)
    return []
  }
}

// ✅ Session analytics for a user
async function getUserSessionAnalytics(userId) {
  try {
    const { data: sessions } = await supabaseAdmin
      .from('learning_sessions')
      .select('status, duration_minutes, actual_duration_minutes, scheduled_at')
      .or(`host_id.eq.${userId},participant_id.eq.${userId}`)

    if (!sessions) return {}

    const completed = sessions.filter(s => s.status === 'completed')
    const totalHours = completed.reduce((sum, s) => sum + (s.actual_duration_minutes || s.duration_minutes || 0), 0) / 60

    return {
      totalSessions: sessions.length,
      completedSessions: completed.length,
      cancelledSessions: sessions.filter(s => s.status === 'cancelled').length,
      noShowSessions: sessions.filter(s => s.status === 'no_show').length,
      totalHours: Math.round(totalHours * 10) / 10,
      completionRate: sessions.length > 0 ? Math.round((completed.length / sessions.length) * 100) : 0
    }
  } catch (err) {
    logger.error(`[Analytics] getUserSessionAnalytics error: ${err.message}`)
    return {}
  }
}

// ✅ Top skills by demand
async function getTopSkillsByDemand({ limit = 10 } = {}) {
  try {
    const { data } = await supabaseAdmin
      .from('user_skills_wanted')
      .select('skill_id, skills(id, name, slug)')
      .limit(1000)

    if (!data) return []

    const counts = new Map()
    data.forEach(({ skill_id, skills }) => {
      if (!counts.has(skill_id)) counts.set(skill_id, { skill: skills, demand: 0 })
      counts.get(skill_id).demand++
    })

    return [...counts.values()]
      .sort((a, b) => b.demand - a.demand)
      .slice(0, limit)
  } catch (err) {
    logger.error(`[Analytics] getTopSkillsByDemand error: ${err.message}`)
    return []
  }
}

module.exports = { getPlatformStats, getUserGrowthTimeSeries, getUserSessionAnalytics, getTopSkillsByDemand }
