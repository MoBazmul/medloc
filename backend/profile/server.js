const express = require('express')
const app = express()
const { errorHandler, notFoundErrorHandler, mainConfig, verifyJWT, PORT } = require('shared_library')

// Configure Middleware
mainConfig()

// Routes
app.use(verifyJWT)
app.use('/pharmacyProfile', require('./routes/pharmacyProfile'))
app.use('/customerProfile', require('./routes/customerProfile'))

// 404 error handler
app.all('*', notFoundErrorHandler)

// Middleware for handling errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
