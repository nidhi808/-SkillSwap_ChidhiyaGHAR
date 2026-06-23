const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller.js')
const { verifyToken, requireRole } = require('../middleware/auth.middleware.js')
const { normalLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, requireRole('admin'), normalLimiter)

router.get('/users', adminController.getUsers)
router.post('/users/:userId/ban', adminController.banUser)
router.post('/users/:userId/unban', adminController.unbanUser)
router.post('/skills/:userSkillId/verify', adminController.verifyUserSkill)
router.get('/audit-logs', adminController.getAuditLogs)

module.exports = router
