const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  healthInsurance: {
    provider: String,
    policyNumber: String,
    expirationDate: Date
  },
  medicalHistory: {
    bloodType: String,
    allergies: [String],
    chronicConditions: [String],
    familyHistory: [String]
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);