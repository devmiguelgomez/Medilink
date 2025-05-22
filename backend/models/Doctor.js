const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  specialty: {
    type: String,
    required: true
  },
  medicalLicense: {
    type: String,
    required: true,
    unique: true
  },
  schedule: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  assignedClinics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);