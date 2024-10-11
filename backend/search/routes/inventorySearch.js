const express = require('express')
const router = express.Router()
const inventorySearchController = require('../controllers/inventorySearchController')

router.post('/', inventorySearchController.handleInventorySearch)

module.exports = router
