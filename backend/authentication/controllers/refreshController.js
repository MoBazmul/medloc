const Customer = require('../../shared_library/models/customer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async(req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) return res.sendStatus(401)

  const refreshToken = cookies.jwt
  const foundCustomer = await Customer.findOne({ token: refreshToken })
  if(!foundCustomer) return res.sendStatus(403)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || foundCustomer.username !== decoded.username) return res.sendStatus(403)
      const roles = Object.values(foundCustomer.roles)
      const accessToken = jwt.sign(
        {
          'userInfo': {
            'username': foundCustomer.username,
            'roles': roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '800s' }
      )
      res.json({ accessToken })
    }
  )
}

module.exports = { handleRefreshToken }
