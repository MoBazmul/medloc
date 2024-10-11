const SearchHistory = require('../model/searchHistory')
const { Customer, Medicine } = require('shared_library')

const handleMedicineSearch = async(req, res) => {
  const medName = req.body
  const cookies = req.cookies
  if(!medName) return res.status(400).json({  'message': 'Medicine name needed to search' })
  if(!cookies?.jwt) return res.status(403).json({ 'message': 'An error occured' })

  const refreshToken = cookies.jwt

  const foundMed = await Medicine.findOne({ name: medName })
  if(!foundMed) return res.json({ 'message': 'The medicine you searched was not found' })

  const customer = await Customer.findOne({ token: refreshToken })
  const newSearchHistory = new SearchHistory({
    userId: customer.id,
    medicineId: foundMed.id
  })

  await newSearchHistory.save()
  res.json(foundMed)
}

module.exports = { handleMedicineSearch }

