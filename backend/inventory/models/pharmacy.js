const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  workingHours: {
    type: {
      days: String,
      open: Date,
      close: Date
    },
    required: true
  },
  location: {
    type: {
      latitude: String,
      longitude: String
    },
    required: true
  },
  otherServices: {
    type: [String]
  },
  timestamps: true
})

const Pharmacy = pharmacySchema.model('Pharmacy', pharmacySchema)

module.exports = Pharmacy
