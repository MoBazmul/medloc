const express = require('express')
const router = express.Router()
const { verifyRoles, ROLES_LIST } = require('shared_library')
const inventoryController = require('../../../controllers/inventoryController')

router.route('/')
  .get(verifyRoles(ROLES_LIST.Pharmacy), inventoryController.getAllInventoryItems)
  .post(verifyRoles(ROLES_LIST.Pharmacy), inventoryController.addInventoryItem)
  .put(verifyRoles(ROLES_LIST.Pharmacy), inventoryController.updateInventoryItem)
  .delete(verifyRoles(ROLES_LIST.Pharmacy), inventoryController.deleteInventoryItem)

router.route('/:id')
.get(verifyRoles(ROLES_LIST.Pharmacy), inventoryController.getInventoryItem)

module.exports = router
