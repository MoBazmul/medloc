const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
  },
  pharmacyId: {
    type: String,
    required: true
  },
  medcineId: {
    type: String
  },
  quantityInStock: {
    type: Number,
    default: 0,
    min: [0, 'Quantity cannot be zero']
  },
  unitPrice: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  supplierDetails: {
    type: {
      supplierName: String,
      contactNumber: String,
      address: String
    }
  },
  lastRestocked: {
    type: Date,
    validate: {
      validator: (value) => {
        return value < Date.now()
      },
      message: 'lastRestocked date must be in the past'
    }
  },
  status: {
    type: String,
    enum: ['Active', 'OutOfStock', 'Discontinued'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory

