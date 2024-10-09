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
  inventory: {
    type: {
      medicineId: String,
      quantityInStock: {
        type: Number,
        default: 0,
        min: [0, 'Quantity cannot be zero']
      },
      unitPrice: {
        type: Number,
        default: 0,
        min: [0, 'Price cannot be negative']
      }
    }
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
  timestamps: true
})

const Pharmacy = pharmacySchema.model('Pharmacy', pharmacySchema)

module.exports = Pharmacy
