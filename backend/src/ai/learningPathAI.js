const { GoogleGenerativeAI } = require('@google/generative-ai')
const logger = require('../utils/logger.js')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL_NAME = 'gemini-1.5-flash' // Fast and accurate for structured text/JSON tasks

/**
 * Generates an AI-powered personalized learning path/roadmap using Google Gemini
 */
async function generateLearningPath(skillName, currentLevel, targetLevel) {
  try {
    const prompt = `Generate a step-by-step personalized learning path/curriculum on SkillSwap (a peer-to-peer exchange platform) to learn "${skillName}".
    Current level: ${currentLevel || 'Beginner'}
    Target level: ${targetLevel || 'Intermediate'}

    Please format the response as a structured JSON object matching this schema:
    {
      "title": "Learning path title",
      "description": "Overview of the path",
      "estimatedDurationHours": 10,
      "steps": [
        {
          "stepNumber": 1,
          "title": "Module/Topic Title",
          "details": "Description of what concepts to cover and practice with the peer teacher.",
          "recommendedSessions": 2
        }
      ]
    }`

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: { responseMimeType: 'application/json' }
    })

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return JSON.parse(text)
  } catch (err) {
    logger.error(`[AI LearningPath] generateLearningPath error: ${err.message}`)
    return {
      title: `Learning Path: ${skillName}`,
      description: `Personalized curriculum to go from ${currentLevel} to ${targetLevel} in ${skillName}.`,
      estimatedDurationHours: 12,
      steps: [
        {
          stepNumber: 1,
          title: 'Foundations and Basics',
          details: 'Focus on understanding core concepts with your swap partner.',
          recommendedSessions: 2
        },
        {
          stepNumber: 2,
          title: 'Intermediate Concepts and Practical Projects',
          details: 'Work through building hands-on exercises and get review feedback.',
          recommendedSessions: 4
        }
      ]
    }
  }
}

module.exports = { generateLearningPath }
