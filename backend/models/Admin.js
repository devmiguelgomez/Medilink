const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_clinics', 'manage_doctors', 'view_reports', 'manage_appointments']
  }],
  adminLevel: {
    type: String,
    enum: ['super_admin', 'clinic_admin'],
    required: true
  },
  assignedClinics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);