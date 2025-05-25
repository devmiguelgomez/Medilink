const Appointment = require('../models/Appointment');
const asyncHandler = require('express-async-handler');

// Obtener todas las citas
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('patient', 'name email')
    .populate('doctor', 'name specialty')
    .populate('clinic', 'name location');
  res.json(appointments);
});

// Crear una nueva cita
const createAppointment = asyncHandler(async (req, res) => {
  const {
    patientId,
    doctorId,
    date,
    type,
    reason,
    clinicId
  } = req.body;

  const appointment = await Appointment.create({
    patient: patientId,
    doctor: doctorId,
    date,
    type,
    reason,
    clinic: clinicId
  });

  if (appointment) {
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error('Datos de cita inválidos');
  }
});

// Actualizar estado de cita
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.status = req.body.status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Cita no encontrada');
  }
});

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointmentStatus
};