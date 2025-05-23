const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
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
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['presencial', 'remota']
  },
  status: {
    type: String,
    required: true,
    enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
    default: 'pendiente'
  },
  reason: {
    type: String,
    required: true
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clinic'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);