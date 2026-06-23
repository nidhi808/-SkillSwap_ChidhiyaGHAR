const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/settings
const getSettings = async (req, res, next) => {
  try {
    const userId = req.user.id
    let settings = await db.selectOne('user_settings', '*', { user_id: userId })
    if (!settings) {
      // Create defaults
      const [newSettings] = await db.insert('user_settings', {
        user_id: userId,
        profile_visibility: 'public',
        show_location: true,
        allow_matching: true,
        theme: 'dark'
      })
      settings = newSettings
    }
    return res.status(200).json({ data: settings })
  } catch (err) { next(err) }
}

// ✅ PUT /api/settings
const updateSettings = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { profile_visibility, show_location, allow_matching, theme } = req.body

    const updates = {}
    if (profile_visibility !== undefined) updates.profile_visibility = profile_visibility
    if (show_location !== undefined) updates.show_location = show_location
    if (allow_matching !== undefined) updates.allow_matching = allow_matching
    if (theme !== undefined) updates.theme = theme

    const [result] = await db.upsert('user_settings', {
      user_id: userId,
      ...updates
    }, { onConflict: 'user_id' })

    return res.status(200).json({ data: result, message: 'Account settings updated.' })
  } catch (err) { next(err) }
}

module.exports = {
  getSettings,
  updateSettings
}
