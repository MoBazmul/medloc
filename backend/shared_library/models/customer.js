const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const customerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: {
      longitude: String,
      latitude: String
    },
  },
  searchHistory: {
    type: {
      medicineId: String,
      searchedAt: Date
    }
  },
  favorites: {
    type: [String]
  },
  notifications: {
    type: {
      medicineId: String,
      pharmacyId: String,
      isRead: Boolean,
      createdAt: Date
    }
  },
  roles: {
    type: String,
    enum: ['customer', 'pharmacy'],
    default: 'customer'
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer

