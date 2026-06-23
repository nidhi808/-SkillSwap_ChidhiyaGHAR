const nodemailer = require('nodemailer')
const logger = require('../utils/logger.js')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100
    })

    this.fromAddress = process.env.EMAIL_FROM || '"SkillSwap" <noreply@skillswap.app>'
    this.appName = process.env.APP_NAME || 'SkillSwap'
    this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

    // Color palette
    this.colors = {
      primary: '#6366f1',
      primaryDark: '#4f46e5',
      bg: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      success: '#22c55e',
      warning: '#f59e0b'
    }
  }

  // ✅ Base send method
  async send(to, subject, html, text = '') {
    try {
      const info = await this.transporter.sendMail({
        from: this.fromAddress,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, '')
      })
      logger.info(`[Email] Sent "${subject}" to ${to} — messageId: ${info.messageId}`)
      return info
    } catch (err) {
      logger.error(`[Email] Failed to send "${subject}" to ${to}: ${err.message}`)
      throw err
    }
  }

  // ✅ Base HTML wrapper
  _buildHtml({ preheader = '', headerTitle = '', headerSubtitle = '', body = '', ctaText = '', ctaUrl = '' } = {}) {
    const c = this.colors
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${this.appName}</title>
</head>
<body style="margin:0;padding:0;font-family:'Inter',Arial,sans-serif;background:${c.bg};color:${c.text};">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${c.bg};padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${c.border};box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,${c.primary} 0%,${c.primaryDark} 100%);padding:40px 40px 32px;">
          <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">${this.appName}</h1>
          ${headerTitle ? `<h2 style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:18px;font-weight:500;">${headerTitle}</h2>` : ''}
          ${headerSubtitle ? `<p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px;">${headerSubtitle}</p>` : ''}
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          ${body}
          ${ctaText && ctaUrl ? `
          <div style="text-align:center;margin:32px 0;">
            <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,${c.primary},${c.primaryDark});color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:16px;">${ctaText}</a>
            <p style="margin:12px 0 0;font-size:12px;color:${c.textMuted};">Or copy this link: <a href="${ctaUrl}" style="color:${c.primary};">${ctaUrl}</a></p>
          </div>` : ''}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:${c.bg};padding:24px 40px;border-top:1px solid ${c.border};text-align:center;">
          <p style="margin:0;font-size:12px;color:${c.textMuted};">© ${new Date().getFullYear()} ${this.appName}. All rights reserved.</p>
          <p style="margin:4px 0 0;font-size:12px;color:${c.textMuted};">You're receiving this because you have an account on ${this.appName}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
  }

  // ✅ 1. Email Verification
  async sendVerificationEmail(email, token, name, userId) {
    const verifyUrl = `${this.frontendUrl}/verify-email?token=${token}&userId=${userId}`
    const html = this._buildHtml({
      preheader: 'Please verify your email address to get started',
      headerTitle: 'Verify Your Email',
      headerSubtitle: 'One click and you\'re in!',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name || 'there'} 👋</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Thanks for joining ${this.appName}! Please verify your email address to activate your account and start exchanging skills.</p>
        <p style="font-size:14px;color:#64748b;margin:0 0 8px;">This link expires in <strong>24 hours</strong>.</p>`,
      ctaText: 'Verify My Email',
      ctaUrl: verifyUrl
    })
    return this.send(email, `Verify your ${this.appName} email`, html)
  }

  // ✅ 2. Welcome Email
  async sendWelcomeEmail(email, name) {
    const html = this._buildHtml({
      preheader: `Welcome to ${this.appName}! Start learning and teaching today.`,
      headerTitle: `Welcome to ${this.appName}! 🎉`,
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name || 'there'}! 🚀</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Your account is verified and ready. Here's how to get started:</p>
        <ul style="font-size:15px;color:#334155;line-height:1.8;padding-left:20px;">
          <li>Complete your profile with your skills</li>
          <li>Add skills you want to learn</li>
          <li>Browse AI-powered skill matches</li>
          <li>Schedule your first learning session</li>
        </ul>`,
      ctaText: 'Complete Your Profile',
      ctaUrl: `${this.frontendUrl}/profile/setup`
    })
    return this.send(email, `Welcome to ${this.appName}!`, html)
  }

  // ✅ 3. Password Reset
  async sendPasswordResetEmail(email, name, resetLink) {
    const html = this._buildHtml({
      preheader: 'Reset your password — link expires in 1 hour',
      headerTitle: 'Reset Your Password',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name || 'there'},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">We received a request to reset your password. Click below to create a new one.</p>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:0 0 16px;">
          <p style="margin:0;font-size:14px;color:#dc2626;">⚠️ This link expires in <strong>1 hour</strong>. If you didn't request this, please ignore this email.</p>
        </div>`,
      ctaText: 'Reset My Password',
      ctaUrl: resetLink
    })
    return this.send(email, `Reset your ${this.appName} password`, html)
  }

  // ✅ 4. Match Found
  async sendMatchFoundEmail(email, name, matchedUserName, matchDetails) {
    const html = this._buildHtml({
      preheader: `You have a new skill match with ${matchedUserName}!`,
      headerTitle: 'New Skill Match! 🎯',
      headerSubtitle: `You matched with ${matchedUserName}`,
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Our AI found a great skill exchange match for you!</p>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:0 0 16px;">
          <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#166534;">Match Score: ${matchDetails?.match_score || 0}%</p>
          ${matchDetails?.ai_explanation ? `<p style="margin:0;font-size:14px;color:#15803d;">${matchDetails.ai_explanation}</p>` : ''}
        </div>`,
      ctaText: 'View Your Match',
      ctaUrl: `${this.frontendUrl}/matches`
    })
    return this.send(email, `New skill match: ${matchedUserName}`, html)
  }

  // ✅ 5. Session Reminder
  async sendSessionReminderEmail(email, name, sessionDetails) {
    const html = this._buildHtml({
      preheader: `Reminder: Your learning session starts in 1 hour`,
      headerTitle: 'Session Reminder ⏰',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Your learning session starts in 1 hour!</p>
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:0 0 16px;">
          <p style="margin:0 0 4px;font-size:15px;"><strong>Session:</strong> ${sessionDetails?.title || 'Learning Session'}</p>
          <p style="margin:0 0 4px;font-size:15px;"><strong>Time:</strong> ${sessionDetails?.scheduled_at ? new Date(sessionDetails.scheduled_at).toLocaleString() : 'TBD'}</p>
          <p style="margin:0;font-size:15px;"><strong>Duration:</strong> ${sessionDetails?.duration_minutes || 60} minutes</p>
        </div>`,
      ctaText: 'Join Session',
      ctaUrl: `${this.frontendUrl}/sessions/${sessionDetails?.id}`
    })
    return this.send(email, `Reminder: Session starting soon — ${sessionDetails?.title}`, html)
  }

  // ✅ 6. Session Confirmed
  async sendSessionConfirmedEmail(email, name, sessionDetails) {
    const html = this._buildHtml({
      preheader: 'Your learning session has been confirmed!',
      headerTitle: 'Session Confirmed ✅',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Your learning session has been confirmed!</p>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:0 0 16px;">
          <p style="margin:0 0 4px;font-size:15px;"><strong>Session:</strong> ${sessionDetails?.title}</p>
          <p style="margin:0 0 4px;font-size:15px;"><strong>Scheduled:</strong> ${sessionDetails?.scheduled_at ? new Date(sessionDetails.scheduled_at).toLocaleString() : 'TBD'}</p>
          <p style="margin:0;font-size:15px;"><strong>Duration:</strong> ${sessionDetails?.duration_minutes || 60} minutes</p>
        </div>`,
      ctaText: 'View Session Details',
      ctaUrl: `${this.frontendUrl}/sessions/${sessionDetails?.id}`
    })
    return this.send(email, `Session confirmed: ${sessionDetails?.title}`, html)
  }

  // ✅ 7. Session Cancelled
  async sendSessionCancelledEmail(email, name, sessionDetails) {
    const html = this._buildHtml({
      preheader: 'Your session has been cancelled',
      headerTitle: 'Session Cancelled',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Unfortunately, the following session has been cancelled:</p>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px;margin:0 0 16px;">
          <p style="margin:0 0 4px;font-size:15px;"><strong>Session:</strong> ${sessionDetails?.title}</p>
          ${sessionDetails?.cancellation_reason ? `<p style="margin:0;font-size:14px;color:#dc2626;"><strong>Reason:</strong> ${sessionDetails.cancellation_reason}</p>` : ''}
        </div>
        <p style="font-size:15px;color:#334155;">You can reschedule a new session at any time.</p>`,
      ctaText: 'Schedule New Session',
      ctaUrl: `${this.frontendUrl}/sessions/new`
    })
    return this.send(email, `Session cancelled: ${sessionDetails?.title}`, html)
  }

  // ✅ 8. Badge Earned
  async sendBadgeEarnedEmail(email, name, badgeName, badgeDescription) {
    const html = this._buildHtml({
      preheader: `You earned the "${badgeName}" badge!`,
      headerTitle: `🏅 Badge Unlocked: ${badgeName}`,
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Congratulations, ${name}! 🎉</p>
        <div style="text-align:center;margin:24px 0;">
          <div style="display:inline-block;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:50%;width:80px;height:80px;line-height:80px;font-size:40px;">🏅</div>
        </div>
        <p style="font-size:16px;color:#334155;margin:0 0 8px;">You've earned the <strong>${badgeName}</strong> badge!</p>
        <p style="font-size:15px;color:#64748b;margin:0 0 16px;">${badgeDescription}</p>`,
      ctaText: 'View Your Badges',
      ctaUrl: `${this.frontendUrl}/profile/badges`
    })
    return this.send(email, `🏅 New badge: ${badgeName}`, html)
  }

  // ✅ 9. New Message Notification
  async sendNewMessageEmail(email, name, senderName, preview) {
    const html = this._buildHtml({
      preheader: `${senderName} sent you a message`,
      headerTitle: 'New Message 💬',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;"><strong>${senderName}</strong> sent you a message:</p>
        <div style="background:#f8fafc;border-left:4px solid #6366f1;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 16px;">
          <p style="margin:0;font-size:15px;color:#334155;font-style:italic;">"${preview?.substring(0, 200)}${preview?.length > 200 ? '...' : ''}"</p>
        </div>`,
      ctaText: 'Reply Now',
      ctaUrl: `${this.frontendUrl}/chat`
    })
    return this.send(email, `New message from ${senderName}`, html)
  }

  // ✅ 10. Email Change Verification
  async sendEmailChangeVerification(email, token, name) {
    const verifyUrl = `${this.frontendUrl}/verify-email-change?token=${token}`
    const html = this._buildHtml({
      preheader: 'Confirm your new email address',
      headerTitle: 'Confirm Email Change',
      body: `
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#334155;margin:0 0 16px;">You requested to change your email address. Click below to confirm this change.</p>
        <div style="background:#fef9f0;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:0 0 16px;">
          <p style="margin:0;font-size:14px;color:#92400e;">⚠️ This link expires in <strong>24 hours</strong>. If you didn't request this, please secure your account immediately.</p>
        </div>`,
      ctaText: 'Confirm Email Change',
      ctaUrl: verifyUrl
    })
    return this.send(email, `Confirm your new ${this.appName} email`, html)
  }
}

// ✅ Export singleton
const emailService = new EmailService()
module.exports = emailService
