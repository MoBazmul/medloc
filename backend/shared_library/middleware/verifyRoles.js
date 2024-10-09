const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(req?.roles) return res.sendStatus(400)
    const rolesArray = [...allowedRoles]

    const result = rolesArray.map(role => req.roles.includes(role)).find(val => val === true)
    if(!result) return res.sendStatus(401)

    next()
  }
}

module.exports = verifyRoles
