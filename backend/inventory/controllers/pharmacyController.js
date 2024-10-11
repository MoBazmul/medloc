const { Pharmacy, Customer } = require('shared_library')

const getAllPharmacies = async(req, res) => {
  const allPharmacies = await Pharmacy.find()
  res.json(allPharmacies)
}

const addPharmacy = async(req, res) => {
  const { name, workingHours, location, otherServices } = req.body
  const cookies = req.cookies
  if(!name || !workingHours || !location) return res.status(400).json({ 'message': 'Name, Working Hours and Location required' })
  if(!cookies?.jwt) return res.sendStatus(400)

  const pharmacist = await Customer.findOne({ token: cookies.jwt })
  
  const newpharmacy = new Pharmacy({
    pharmacistId: pharmacist.id,
    name: name,
    workingHours: workingHours,
    location: location,
    otherServices: otherServices
  })

  await newpharmacy.save()
  res.sendStatus(201)
}

const updatePharmacy = async(req, res) => {
  if(!req.body.id || !req.body.name || !req.body.workingHours || !req.body.location) return res.status(400).json({ 'message': 'An error occured try again' })
  
  const pharmacy = await Pharmacy.findById(req.body.id)
  if(!pharmacy) return res.status(204).json({ 'message': 'The pharmacy does not exist' })
  
  const pharmName = req.body.name
  const pharmWorkingHours = req.body.workingHours
  const pharmLocation = req.body.location
  const pharmOtherServices = req.body.otherServices

  pharmacy.name = pharmName
  pharmacy.workingHours = pharmWorkingHours
  pharmacy.location = pharmLocation
  pharmacy.otherServices = pharmOtherServices

  await pharmacy.save()

  res.sendStatus(204)
}

const deletePharmacy = async(req, res) => {
  if(!req.body.id) return res.status(400).json({ 'message': 'An ID is required' })

  await Pharmacy.deleteOne({ id: req.body.id })
  res.sendStatus(204)
}

const getPharmacy = async(req, res) => {
  if(!req.params.id) return res.status(400).json({ 'message': 'An ID is required' })
  const pharmacy = await Pharmacy.findById(req.body.id)
  if(!pharmacy) return res.status(204).json({ 'message': 'The pharmacy does not exist' })

  res.json(pharmacy)
}

module.exports = {
  getAllPharmacies,
  addPharmacy,
  updatePharmacy,
  deletePharmacy,
  getPharmacy
}

