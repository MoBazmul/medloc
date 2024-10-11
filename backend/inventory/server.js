const express = require('express')
const app = express()
const { errorHandler, notFoundErrorHandler, mainConfig, verifyJWT, PORT } = require('shared_library')

// Configure middleware
mainConfig()

// Routes
app.use(verifyJWT)
app.use('/medicines', require('./routes/api/v1/medicines'))
app.use('/pharmacies', require('./routes/api/v1/pharmacies'))

// 404 error handler
app.all('*', notFoundErrorHandler)

// Middleware for handling errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
