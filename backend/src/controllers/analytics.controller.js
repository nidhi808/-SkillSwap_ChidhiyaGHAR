const { getPlatformStats, getUserGrowthTimeSeries, getUserSessionAnalytics, getTopSkillsByDemand } = require('../services/analyticsService.js')
const logger = require('../utils/logger.js')

// ✅ GET /api/analytics/platform
const getPlatformAnalytics = async (req, res, next) => {
  try {
    const stats = await getPlatformStats()
    const growth = await getUserGrowthTimeSeries()
    const topSkills = await getTopSkillsByDemand()

    return res.status(200).json({
      data: {
        stats,
        growth,
        topSkills
      }
    })
  } catch (err) { next(err) }
}

// ✅ GET /api/analytics/user/:userId
const getUserAnalytics = async (req, res, next) => {
  try {
    const { userId } = req.params
    // Allow users to view their own analytics, and admin to view any user's analytics
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to view this user\'s analytics.' })
    }

    const sessionStats = await getUserSessionAnalytics(userId)
    return res.status(200).json({ data: sessionStats })
  } catch (err) { next(err) }
}

module.exports = {
  getPlatformAnalytics,
  getUserAnalytics
}
