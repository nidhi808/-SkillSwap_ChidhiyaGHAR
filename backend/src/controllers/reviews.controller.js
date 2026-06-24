const { supabaseAdmin } = require('../config/supabaseClient')
const db = require('../services/db.js')
const logger = require('../utils/logger.js')

// ✅ POST /api/reviews
const submitReview = async (req, res, next) => {
  try {
    const reviewerId = req.user.id
    const { sessionId, rating, comment } = req.body

    if (!sessionId || !rating) {
      return res.status(400).json({ error: 'sessionId and rating are required.' })
    }

    // Verify session exists and is completed
    const session = await db.selectOne('learning_sessions', '*', { id: sessionId, status: 'completed' })
    if (!session) {
      return res.status(400).json({ error: 'Session must exist and be completed to submit a review.' })
    }

    // Check if user was participant in the session
    const isHost = session.host_id === reviewerId
    const isParticipant = session.participant_id === reviewerId
    if (!isHost && !isParticipant) {
      return res.status(403).json({ error: 'You must have participated in this session to review it.' })
    }

    const revieweeId = isHost ? session.participant_id : session.host_id

    // Check if review already submitted by this reviewer for this session
    const existing = await db.selectOne('reviews', 'id', { session_id: sessionId, reviewer_id: reviewerId })
    if (existing) {
      return res.status(409).json({ error: 'You have already reviewed this session.' })
    }

    // Insert review
    const [review] = await db.insert('reviews', {
      session_id: sessionId,
      reviewer_id: reviewerId,
      reviewee_id: revieweeId,
      rating,
      comment: comment || null
    })

    // Update target user profile avg_rating and total_reviews asynchronously
    setImmediate(async () => {
      try {
        const { data: allReviews } = await supabaseAdmin
          .from('reviews')
          .select('rating')
          .eq('reviewee_id', revieweeId)

        if (allReviews && allReviews.length > 0) {
          const totalReviews = allReviews.length
          const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          await db.update('profiles', {
            avg_rating: Math.round(avgRating * 100) / 100,
            total_reviews: totalReviews
          }, { id: revieweeId })
        }
      } catch (e) {
        logger.error(`[Reviews] Failed to recalculate ratings for user ${revieweeId}: ${e.message}`)
      }
    })

    return res.status(201).json({ data: review, message: 'Review submitted.' })
  } catch (err) { next(err) }
}

// ✅ GET /api/reviews/user/:userId
const getUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { type = 'received' } = req.query // 'received' or 'written'

    const field = type === 'written' ? 'reviewer_id' : 'reviewee_id'

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select(`
        *,
        reviewer:reviewer_id(id, username, profiles:id(full_name, avatar_url)),
        reviewee:reviewee_id(id, username, profiles:id(full_name, avatar_url))
      `)
      .eq(field, userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return res.status(200).json({ data: data || [] })
  } catch (err) { next(err) }
}

// ✅ POST /api/reviews/:reviewId/respond
const respondToReview = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { responseComment } = req.body
    if (!responseComment) return res.status(400).json({ error: 'Response comment is required.' })

    const review = await db.selectOne('reviews', '*', { id: req.params.reviewId })
    if (!review) return res.status(404).json({ error: 'Review not found.' })

    if (review.reviewee_id !== userId) {
      return res.status(403).json({ error: 'Only the review recipient can respond.' })
    }

    const [updated] = await db.update('reviews', {
      response_comment: responseComment,
      updated_at: new Date().toISOString()
    }, { id: review.id })

    return res.status(200).json({ data: updated, message: 'Response submitted.' })
  } catch (err) { next(err) }
}

module.exports = {
  submitReview,
  getUserReviews,
  respondToReview
}
