const Customer = require('../../shared_library/models/customer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogout = async(req, res) => {
  const cookie = req.cookie
  if(!cookie?.jwt) return res.sendStatus(401)
  
  const refreshToken = cookie.jwt
  const foundCustomer = await Customer.findOne({ token: refreshToken })
  if(!foundCustomer) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
  }

  foundCustomer.token = ''
  await foundCustomer.save()

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
}

module.exports = { handleLogout }

