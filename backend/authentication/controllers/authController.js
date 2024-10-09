const Customer = require('../../shared_library/models/customer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const handleAuth = async(req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ 'message': 'Email and password required to Log In' })
  
  const foundCustomer = await Customer.findOne({ email: email })
  if(!foundCustomer) return res.status(401).json({ 'message': 'Incorrect Email' })
  const match = await bcrypt.compare(password, foundCustomer.password)
  if(match) {
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

    const refreshToken = jwt.sign(
      { 'username': foundCustomer.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )

    foundCustomer.token = refreshToken
    try {
      await foundCustomer.save()
    } catch(err) {
      console.error(`Error: ${err.message}`)
    }

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 * 30 })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleAuth }
