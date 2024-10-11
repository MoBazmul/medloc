const express = require('express')
const router = express.Router()
const customerProfileController = require('../controller/customerProfileController')

router.get('/', customerProfileController.handleCustomerProfile)

module.exports = router
