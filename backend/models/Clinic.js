const mongoose = require('mongoose');

const clinicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: [{
    day: String,
    openTime: String,
    closeTime: String
  }],
  facilities: [String],
  specialties: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Clinic', clinicSchema);