const express = require('express')
const router = express.Router()
const deleteController = require('../controllers/delete.controller.js')
const { verifyToken } = require('../middleware/auth.middleware.js')
const { strictLimiter } = require('../services/rateLimitter.js')

router.use(verifyToken, strictLimiter)

router.post('/soft', deleteController.softDeleteAccount)
router.delete('/hard', deleteController.hardDeleteAccount)

module.exports = router
