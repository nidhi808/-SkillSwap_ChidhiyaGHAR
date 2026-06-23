// ✅ RBAC middleware — role-based access control
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required.' })
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: `Access denied. Required role: ${roles.join(' or ')}`,
      yourRole: req.user.role
    })
  }
  next()
}

// ✅ Admin guard
const requireAdmin = requireRole('admin', 'super_admin')

// ✅ Moderator or above
const requireModerator = requireRole('moderator', 'admin', 'super_admin')

// ✅ Super admin only
const requireSuperAdmin = requireRole('super_admin')

// ✅ Resource ownership guard — checks if user owns the resource
const requireOwnership = (getResourceOwnerId) => async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
    // Super admins bypass ownership checks
    if (['admin', 'super_admin'].includes(req.user.role)) return next()

    const ownerId = await getResourceOwnerId(req)
    if (!ownerId) return res.status(404).json({ error: 'Resource not found.' })
    if (ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to access this resource.' })
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { requireRole, requireAdmin, requireModerator, requireSuperAdmin, requireOwnership }
