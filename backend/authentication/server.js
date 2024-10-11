const express = require('express')
const app = express()
const { errorHandler, notFoundErrorHandler, mainConfig, PORT } = require('shared_library')

// Configure middlewares
mainConfig()

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

// 404 error handler
app.all('*', notFoundErrorHandler)

// Middleware for handling errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
