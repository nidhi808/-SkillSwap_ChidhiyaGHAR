const { generateMatchExplanation } = require('../ai/matchingAlgorithm.js')
const { generateLearningPath } = require('../ai/learningPathAI.js')
const { answerLearningQuestion } = require('../services/ragService.js')

// ✅ GET /api/ai/match-explanation/:targetUserId
const getMatchExplanation = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { targetUserId } = req.params

    const explanation = await generateMatchExplanation(userId, targetUserId)
    return res.status(200).json({ data: { explanation } })
  } catch (err) { next(err) }
}

// ✅ POST /api/ai/learning-path
const createLearningPath = async (req, res, next) => {
  try {
    const { skillName, currentLevel, targetLevel } = req.body
    if (!skillName) return res.status(400).json({ error: 'skillName is required.' })

    const path = await generateLearningPath(skillName, currentLevel, targetLevel)
    return res.status(200).json({ data: path })
  } catch (err) { next(err) }
}

// ✅ POST /api/ai/ask
const askQuestion = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { question } = req.body
    if (!question) return res.status(400).json({ error: 'question is required.' })

    const result = await answerLearningQuestion(userId, question)
    return res.status(200).json({ data: result })
  } catch (err) { next(err) }
}

module.exports = {
  getMatchExplanation,
  createLearningPath,
  askQuestion
}
