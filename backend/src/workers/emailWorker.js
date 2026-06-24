const emailService = require('../services/emailService.js')
const logger = require('../utils/logger.js')

async function processEmailJob(job) {
  const { type, email, name, data } = job.data
  logger.info(`[Email Worker] Processing email job ${job.id} (Type: ${type}) to: ${email}`)

  try {
    switch (type) {
      case 'verification':
        await emailService.sendVerificationEmail(email, data.token, name, data.userId)
        break
      case 'welcome':
        await emailService.sendWelcomeEmail(email, name)
        break
      case 'password_reset':
        await emailService.sendPasswordResetEmail(email, name, data.resetLink)
        break
      case 'match':
        await emailService.sendMatchFoundEmail(email, name, data.matchedUserName, data.matchDetails)
        break
      case 'session_reminder':
        await emailService.sendSessionReminderEmail(email, name, data.sessionDetails)
        break
      case 'session_confirmed':
        await emailService.sendSessionConfirmedEmail(email, name, data.sessionDetails)
        break
      case 'session_cancelled':
        await emailService.sendSessionCancelledEmail(email, name, data.sessionDetails)
        break
      case 'badge':
        await emailService.sendBadgeEarnedEmail(email, name, data.badgeName, data.badgeDescription)
        break
      case 'message':
        await emailService.sendNewMessageEmail(email, name, data.senderName, data.preview)
        break
      case 'email_change':
        await emailService.sendEmailChangeVerification(email, data.token, name)
        break
      default:
        logger.warn(`[Email Worker] Unknown email type: ${type}`)
    }
    return { success: true }
  } catch (err) {
    logger.error(`[Email Worker] Error sending email: ${err.message}`)
    throw err
  }
}

module.exports = { processEmailJob }
