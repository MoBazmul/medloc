const express = require('express')
const router = express.Router()
const pharmacyController = require('../../../controllers/pharmacysController')
const verifyRoles = require('../../../../shared_library/middleware/verifyRoles')
const ROLES_LIST = require('../../../../shared_library/middleware/verifyRoles')

router.route('/')
  .get(verifyRoles(ROLES_LIST.Pharmacy), pharmacyController.getAllPharmacies)

  .post(verifyRoles(ROLES_LIST.Pharmacy), pharmacyController.addPharmacy)

  .put(verifyRoles(ROLES_LIST.Pharmacy), pharmacyController.updatePharmacy)

  .delete(verifyRoles(ROLES_LIST.Pharmacy), pharmacyController.deletePharmacy)

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.Pharmacy), pharmacyController.getPharmacy)

module.exports = router

