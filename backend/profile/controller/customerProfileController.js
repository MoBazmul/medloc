const Customer = require('../../inventory/models/medicine')

const handleCustomerProfile = async(req, res) => {
  if(!req.body.name) return res.status(400).json({ 'message': 'Invalid Request' })
  const customer = await Customer.findOne({ name: req.body.name })
  if(!customer) return res.sendStatus(204).json({ 'message': 'An Error occured' })

  res.json(customer)
}

module.exports = { handleCustomerProfile }
