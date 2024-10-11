const express = require('express')
const router = express.Router()
const pharmacyProfileController = require('../controller/pharmacyProfileController')

router.get('/', pharmacyProfileController.handlePharmacyProfile)

module.exports = router


