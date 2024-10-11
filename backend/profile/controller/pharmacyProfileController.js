const Pharmacy = require('../../inventory/models/pharmacy')

const handlePharmacyProfile = async(req, res) => {
  if(!req.body.name) return res.status(400).json({ 'message': 'Invalid Request' })
  const pharmacy = await Pharmacy.findOne({ name: req.body.name })
  if(!pharmacy) return res.sendStatus(204).json({ 'message': 'An Error occured' })

  res.json(pharmacy)
}

module.exports = { handlePharmacyProfile }
