const Medicine = require('../models/medicine')

const getAllMedicines = async(req, res) => {
  const allMedicines = await Medicine.find()
  res.json(allMedicines)
}

const addMedicine = async(req, res) => {
  const { name, category, expirationDate } = req.body
  if(!name || !category || !expirationDate) return res.status(400).json({ 'message': 'NAme, Category and Expiration date of the medicine required' })
  
  const newMedicine = new Medicine({
    name: name,
    category: category,
    expirationDate: expirationDate
  })

  await newMedicine.save()
  res.sendStatus(201)
}

const updateMedicine = async(req, res) => {
  if(!req.body.id || !req.body.name || !req.body.category || !req.body.expirationDate) return res.status(400).json({ 'message': 'An error occured try again' })
  
  const medicine = await Medicine.findById(req.body.id)
  if(!medicine) return res.status(204).json({ 'message': 'The medicine does not exist' })
  
  const medName = req.body.name
  const medCategory = req.body.category
  const medExpirationDate = req.body.expirationDate

  medicine.name = medName
  medicine.category = medCategory
  medicine.expirationDate = medExpirationDate

  await medicine.save()

  res.sendStatus(204)
}

const deleteMedicine = async(req, res) => {
  if(!req.body.id) return res.status(400).json({ 'message': 'An ID is required' })

  await Medicine.deleteOne({ id: req.body.id })
  res.sendStatus(204)
}

const getMedicine = async(req, res) => {
  if(!req.params.id) return res.status(400).json({ 'message': 'An ID is required' })
  const medicine = await Medicine.findById(req.body.id)
  if(!medicine) return res.status(204).json({ 'message': 'The medicine does not exist' })

  res.json(medicine)
}

module.exports = {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine
}

