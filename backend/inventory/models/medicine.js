const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const medicineSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Prescription', 'Over-the-Counter', 'Supplement'], 
    required: true
  },
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  expirationDate: {
    type: Date,
    validate: {
      validator: (value) => {
        return value => Date.now()
      },
      message: 'Expiration date must be in the future'
    },
    required: true
  },
  timestamps: true
})

const Medicine = mongoose.model('Medicine', medicineSchema)

module.exports = Medicine

