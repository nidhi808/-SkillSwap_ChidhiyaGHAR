const OpenAI = require('openai')
const logger = require('../utils/logger.js')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/**
 * Generates an AI-powered personalized learning path/roadmap
 */
async function generateLearningPath(skillName, currentLevel, targetLevel) {
  try {
    const prompt = `Generate a step-by-step personalized learning path/curriculum on SkillSwap (a peer-to-peer exchange platform) to learn "${skillName}".
    Current level: ${currentLevel || 'Beginner'}
    Target level: ${targetLevel || 'Intermediate'}

    Please format the response as a structured JSON object:
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

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an EdTech learning path curator. You output ONLY valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(completion.choices[0].message.content)
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
