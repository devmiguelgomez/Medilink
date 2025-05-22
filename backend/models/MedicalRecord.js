const mongoose = require('mongoose');

const medicalRecordSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  date: {
    type: Date,
    default: Date.now
  },
  diagnosis: String,
  observations: String,
  treatments: [String],
  examinations: [{
    name: String,
    results: String,
    date: Date
  }],
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);