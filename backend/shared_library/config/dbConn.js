const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database connected successfully')
  } catch(err) {
    console.log(`An error occured while connecting: ${err}`)
  }
}

module.exports = connectDB
