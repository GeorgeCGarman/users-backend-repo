const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401)
    const rolesArray = [...allowedRoles]
    const result = rolesArray.find(currentRole => currentRole === req.role)
    if (!result) return res.sendStatus(401)
    next()
  }
}

module.exports = verifyRole