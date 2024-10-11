const { Inventory, Medicine, Customer, Pharmacy } = require('shared_library')

const getAllInventoryItems = async(req, res) => {
  res.json(await Inventory.find())
}

const addInventoryItem = async(req, res) => {
  const { medicineName, quantityInStock, unitPrice, supplierDetails } = req.body
  const cookies = req.cookies
  if(!cookies?.jwt) return res.json({ 'message': 'An error occured' })
  if(!medicineName || !quantityInStock || !unitPrice || !supplierDetails) return res.status(400).json({ 'message': 'Check the form and try again' })

  const customer = await Customer.findOne({ token: cookies.jwt })
  const medicine = await Medicine.findOne({ name: medicineName })
  const pharmacy = await Pharmacy.findOne({ pharmacistId: customer.id })

  const newAdd = new Inventory({
    pharmacyId: pharmacy.id,
    medicineId: medicine.id,
    quantityInStock: quantityInStock,
    unitPrice: unitPrice,
    supplierDetails: supplierDetails
  })

  await newAdd.save()
}

const updateInventoryItem = async(req, res) => {
  if(!req.body.id) return res.status(400).json({ 'message': 'The item id is missing, try again' })
  const inventoryItem = await Inventory.findById(req.body.id)
  const { quantityInStock, unitPrice, supplierDetails } = req.body
  if(!quantityInStock || !unitPrice || !supplierDetails) return res.status(400).json({ 'message': 'Check the form and try again' })

  inventoryItem.quantityInStock = quantityInStock
  inventoryItem.unitPrice = unitPrice
  inventoryItem.supplierDetails = supplierDetails

  await inventoryItem.save()
}

const deleteInventoryItem = async(req, res) => {
  if(!req.body.id) return res.status(400).json({ 'message': 'The item id is missing, try again' })
  await Inventory.findByIdAndDelete(req.body.id)
  res.sendStatus(204)
}

const getInventoryItem = async(req, res) => {
  if(!req.params.id) return res.status(400).json({ 'message': 'The item id is missing, try again' })
  await Inventory.findByIdAndDelete(req.body.id)
  res.sendStatus(204)
}

module.exports = {
  getAllInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItem
}

