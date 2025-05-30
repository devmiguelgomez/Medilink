const Appointment = require('../models/Appointment');
const asyncHandler = require('express-async-handler');

// Get all appointments (filtered by role)
const getAppointments = asyncHandler(async (req, res) => {
  const { role } = req.user;
  let query = {};

  // If user is a patient, only show their appointments
  if (role === 'patient') {
    query.patient = req.user._id;
  } 
  // If user is a doctor, show appointments assigned to them
  else if (role === 'doctor') {
    query.doctor = req.user._id;
  }

  const appointments = await Appointment.find(query)
    .populate('patient', 'name')
    .populate('doctor', 'name')
    .sort({ date: 1 });

  res.json(appointments);
});

// Get completed appointments
const getCompletedAppointments = asyncHandler(async (req, res) => {
  const { role } = req.user;
  let query = { status: 'completada' };

  // If user is a doctor, only show their completed appointments
  if (role === 'doctor') {
    query.doctor = req.user._id;
  }

  const appointments = await Appointment.find(query)
    .populate('patient', 'name')
    .populate('doctor', 'name')
    .sort({ date: -1 });

  res.json(appointments);
});

// Create new appointment
const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, type, reason } = req.body;

  if (!doctorId || !date || !type || !reason) {
    res.status(400);
    throw new Error('Por favor complete todos los campos requeridos');
  }

  // Validate date is in the future
  const appointmentDate = new Date(date);
  if (appointmentDate < new Date()) {
    res.status(400);
    throw new Error('La fecha de la cita debe ser en el futuro');
  }

  // Check if doctor exists and is available at that time
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    status: { $in: ['pendiente', 'confirmada'] }
  });

  if (existingAppointment) {
    res.status(400);
    throw new Error('El doctor ya tiene una cita programada en ese horario');
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    date: appointmentDate,
    type,
    reason,
    status: 'pendiente'
  });

  if (appointment) {
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    res.status(201).json(populatedAppointment);
  } else {
    res.status(400);
    throw new Error('Error al crear la cita');
  }
});

// Update appointment status
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Cita no encontrada');
  }

  // Verify the user has permission to update this appointment
  if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para actualizar esta cita');
  }

  if (req.user.role === 'patient' && appointment.patient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para actualizar esta cita');
  }

  appointment.status = req.body.status;
  const updatedAppointment = await appointment.save();

  res.json(updatedAppointment);
});

// Cancel appointment
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Cita no encontrada');
  }

  // Verify the user has permission to cancel this appointment
  if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para cancelar esta cita');
  }

  if (req.user.role === 'patient' && appointment.patient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para cancelar esta cita');
  }

  appointment.status = 'cancelada';
  const updatedAppointment = await appointment.save();

  res.json(updatedAppointment);
});

module.exports = {
  getAppointments,
  getCompletedAppointments,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment
};