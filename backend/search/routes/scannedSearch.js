const express = require('express')
const router = express.Router()
const scannedSearchController = require('../controllers/scannedSearchController')

router.post('/', scannedSearchController.handleMedicineSearch)

module.exports = router
