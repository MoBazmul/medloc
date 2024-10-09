const bcrypt = require('bcrypt')
const Customer = require('../../shared_library/models/customer')

const handleRegistration = async(req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password) return res.status(400).json({ 'message': 'Username, email and password required' })
  
  const foundUser = await Customer.findOne({ username: username })
  if(foundUser) return res.status(409).json({ 'message': 'Username already exists' })
  
  const hashedPwd = await bcrypt.hash(password, 10)
  const newUser = new Customer({
    username: username,
    email: email,
    password: hashedPwd,
  })

  try {
    await newUser.save()
  } catch(err) {
    console.error(`Error: ${err.message}`)
  }
}

module.exports = { handleRegistration }
