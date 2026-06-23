const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/schedule/calendar
const getCalendarBookings = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { startDate, endDate } = req.query

    let query = supabaseAdmin
      .from('learning_sessions')
      .select('id, title, description, scheduled_at, duration_minutes, status, host_id, participant_id')
      .or(`host_id.eq.${userId},participant_id.eq.${userId}`)
      .neq('status', 'cancelled')

    if (startDate) query = query.gte('scheduled_at', startDate)
    if (endDate) query = query.lte('scheduled_at', endDate)

    const { data, error } = await query
    if (error) throw error

    return res.status(200).json({ data: data || [] })
  } catch (err) { next(err) }
}

// ✅ GET /api/schedule/slots/:targetUserId
const getAvailableSlots = async (req, res, next) => {
  try {
    const { targetUserId } = req.params

    // 1. Get weekly availability template of target user
    const availability = await db.select('availability', '*', { user_id: targetUserId })

    // 2. Get future sessions already booked for target user
    const { data: bookings, error } = await supabaseAdmin
      .from('learning_sessions')
      .select('scheduled_at, duration_minutes')
      .or(`host_id.eq.${targetUserId},participant_id.eq.${targetUserId}`)
      .in('status', ['pending', 'confirmed'])
      .gte('scheduled_at', new Date().toISOString())

    if (error) throw error

    return res.status(200).json({
      data: {
        weeklyTemplate: availability || [],
        bookedSessions: bookings || []
      }
    })
  } catch (err) { next(err) }
}

module.exports = {
  getCalendarBookings,
  getAvailableSlots
}
