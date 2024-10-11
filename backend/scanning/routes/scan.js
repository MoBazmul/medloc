const express = require('express')
const router = express.Router()
const scanCotroller = require('../controller/scanController')

router.post('/', scanCotroller.handleScan)

module.exports = router

