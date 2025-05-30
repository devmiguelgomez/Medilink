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
  officeAssignments: [{
    officeNumber: String,
    floor: String,
    building: String
  }],
  consultationHours: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
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