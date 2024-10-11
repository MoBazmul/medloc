const { Inventory, Medicine } = require('shared_library')

const handleInventorySearch = async(req, res) => {
  if(!req.medicineName) return res.sendStatus(400)
  const medicine = await Medicine.findOne({ name: req.medicineName })

  const inventoryItem = await Inventory.findOne({ medicineId: medicine.id })
  res.json(inventoryItem)
}

module.exports = { handleInventorySearch }
