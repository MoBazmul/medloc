const express = require('express')
const router = express.Router()
const medicineController = require('../../../controllers/medicinesController')
const verifyRoles = require('../../../../shared_library/middleware/verifyRoles')
const ROLES_LIST = require('../../../../shared_library/middleware/verifyRoles')

router.route('/')
  .get(verifyRoles(ROLES_LIST.Pharmacy), medicineController.getAllMedicines)

  .post(verifyRoles(ROLES_LIST.Pharmacy), medicineController.addMedicine)

  .put(verifyRoles(ROLES_LIST.Pharmacy), medicineController.updateMedicine)

  .delete(verifyRoles(ROLES_LIST.Pharmacy), medicineController.deleteMedicine)

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.Pharmacy), medicineController.getMedicine)

module.exports = router

