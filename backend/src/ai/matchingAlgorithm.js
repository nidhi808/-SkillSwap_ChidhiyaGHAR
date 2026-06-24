const { GoogleGenerativeAI } = require('@google/generative-ai')
const { supabaseAdmin } = require('../config/supabaseClient')
const logger = require('../utils/logger.js')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL_NAME = 'gemini-1.5-flash' // Gemini 1.5 Flash is ideal for fast, lightweight explanations

/**
 * Generates an AI-powered explanation for a match between two users using Google Gemini
 */
async function generateMatchExplanation(userAId, userBId) {
  try {
    // Fetch profiles and skills
    const [
      { data: profileA },
      { data: profileB },
      { data: skillsA },
      { data: skillsB }
    ] = await Promise.all([
      supabaseAdmin.from('profiles').select('id, full_name, bio, location').eq('id', userAId).single(),
      supabaseAdmin.from('profiles').select('id, full_name, bio, location').eq('id', userBId).single(),
      supabaseAdmin.from('user_skills_offered').select('skills(name), proficiency_level').eq('user_id', userAId),
      supabaseAdmin.from('user_skills_offered').select('skills(name), proficiency_level').eq('user_id', userBId)
    ])

    const teachA = (skillsA || []).map(s => `${s.skills?.name} (${s.proficiency_level})`).join(', ')
    const teachB = (skillsB || []).map(s => `${s.skills?.name} (${s.proficiency_level})`).join(', ')

    const prompt = `Explain why User A and User B are a great match for a peer-to-peer skill exchange.
    User A's name: ${profileA?.full_name || 'User A'}
    User A teaches: ${teachA || 'No skills listed yet'}
    User A bio: ${profileA?.bio || ''}

    User B's name: ${profileB?.full_name || 'User B'}
    User B teaches: ${teachB || 'No skills listed yet'}
    User B bio: ${profileB?.bio || ''}

    Keep the explanation under 80 words. Be natural, conversational, and direct, highlighting mutual learning opportunity.`

    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return text.trim()
  } catch (err) {
    logger.error(`[AI Matching] generateMatchExplanation error: ${err.message}`)
    return 'Our AI matching algorithm matches you based on your complementary skill offerings and requirements.'
  }
}

module.exports = { generateMatchExplanation }
