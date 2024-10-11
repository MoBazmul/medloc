const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const searchHistorySchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
  },
  userId: {
    type: String,
    required: true
  },
  medicineId: {
    type: String,
    required: true
  },
  searchedAt: {
    type: Date
  }
})

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema)

module.exports = SearchHistory
