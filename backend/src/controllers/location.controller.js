const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/location/nearby
const getNearbyUsers = async (req, res, next) => {
  try {
    const { latitude, longitude, radiusKm = 50 } = req.query
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'latitude and longitude query parameters are required.' })
    }

    // Attempt PostGIS vector distance search via Supabase RPC
    const { data: nearby, error } = await supabaseAdmin.rpc('get_nearby_profiles', {
      user_lat: parseFloat(latitude),
      user_lon: parseFloat(longitude),
      radius_km: parseFloat(radiusKm)
    })

    if (error) {
      logger.warn(`[Location] get_nearby_profiles RPC error (using DB fallback): ${error.message}`)

      // Fallback: simple search based on city/country matching of the current user
      const userProfile = await db.selectOne('profiles', 'city, country_code', { id: req.user.id })
      if (!userProfile?.city) return res.status(200).json({ data: [] })

      const matches = await db.select('profiles', 'id, full_name, avatar_url, city, country_code, avg_rating', {
        city: userProfile.city,
        country_code: userProfile.country_code
      })

      // Remove self
      const filtered = (matches || []).filter(m => m.id !== req.user.id)
      return res.status(200).json({ data: filtered })
    }

    return res.status(200).json({ data: nearby || [] })
  } catch (err) { next(err) }
}

module.exports = {
  getNearbyUsers
}
