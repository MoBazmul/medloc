const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('../shared_library/config/corsOptions')
const credentials = require('../shared_library/middleware/credentials')
const { logger } = require('../shared_library/middleware/logEvents')
const errorHandler = require('../shared_library/middleware/errorHandler')
const notFoundErrorHandler = require('../shared_library/config/404')
const connectDB = require('../shared_library/config/dbConn')
const verifyJWT = require('../shared_library/middleware/verifyJWT.JS')

const PORT = require('../shared_library/config/port')

// Log message for each request
app.use(logger)

// Connect the DB
connectDB()

// CORS middleware
app.use(credentials)
app.use(cors(corsOptions))

// Middleware for urlencoded data (forms data)
app.use(express.urlencoded({ extended: false }))

// Middleware for json data
app.use(express.json())

// Routes
app.use(verifyJWT)
app.use('/medicines', require('./routes/api/v1/medicines'))
app.use('/pharmacy', require('./routes/api/v1/pharmacy'))

// 404 error handler
app.all('*', notFoundErrorHandler)

// Middleware for handling errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
