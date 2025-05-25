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
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'
  },
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  experience: Number,
  education: [{
    degree: String,
    institution: String,
    year: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);