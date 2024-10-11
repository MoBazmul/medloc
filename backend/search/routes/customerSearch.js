const express = require('express')
const router = express.Router()
const customerSearchController = require('../controllers/customerSearchController')

router.post('/', customerSearchController.handleMedicineSearch)

module.exports = router
