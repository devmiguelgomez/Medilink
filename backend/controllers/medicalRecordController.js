const MedicalRecord = require('../models/MedicalRecord');
const Appointment = require('../models/Appointment');
const asyncHandler = require('express-async-handler');

// Get medical records
const getPatientMedicalRecords = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { role } = req.user;

  let query = {};
  
  // If user is a patient, only show their records
  if (role === 'patient') {
    query.patient = req.user._id;
  } 
  // If user is a doctor and patientId is provided, show that patient's records
  else if (role === 'doctor' && patientId) {
    query.patient = patientId;
  }
  // If user is a doctor and no patientId, show all records
  else if (role === 'doctor') {
    query.doctor = req.user._id;
  }

  const records = await MedicalRecord.find(query)
    .populate('doctor', 'name')
    .populate('patient', 'name')
    .populate('appointment', 'date type reason')
    .sort({ createdAt: -1 });

  res.json(records);
});

// Create medical record from appointment
const createMedicalRecord = asyncHandler(async (req, res) => {
  const { appointmentId, diagnosis, treatment, notes, followUpDate } = req.body;

  // Verify the appointment exists and is assigned to this doctor
  const appointment = await Appointment.findById(appointmentId);
  
  if (!appointment) {
    res.status(404);
    throw new Error('Cita no encontrada');
  }

  if (appointment.doctor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para crear registros médicos para esta cita');
  }

  if (appointment.status !== 'completed') {
    res.status(400);
    throw new Error('Solo se pueden crear registros médicos para citas completadas');
  }

  // Check if a record already exists for this appointment
  const existingRecord = await MedicalRecord.findOne({ appointment: appointmentId });
  if (existingRecord) {
    res.status(400);
    throw new Error('Ya existe un registro médico para esta cita');
  }

  const record = await MedicalRecord.create({
    appointment: appointmentId,
    doctor: req.user._id,
    patient: appointment.patient,
    diagnosis,
    treatment,
    notes,
    followUpDate
  });

  if (record) {
    // Update appointment status if needed
    appointment.hasMedicalRecord = true;
    await appointment.save();

    res.status(201).json(record);
  } else {
    res.status(400);
    throw new Error('Datos de registro médico inválidos');
  }
});

// Update medical record
const updateMedicalRecord = asyncHandler(async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Registro médico no encontrado');
  }

  // Verify the doctor is the one who created the record
  if (record.doctor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para modificar este registro médico');
  }

  record.diagnosis = req.body.diagnosis || record.diagnosis;
  record.treatment = req.body.treatment || record.treatment;
  record.notes = req.body.notes || record.notes;
  record.followUpDate = req.body.followUpDate || record.followUpDate;
  record.status = req.body.status || record.status;

  const updatedRecord = await record.save();
  res.json(updatedRecord);
});

module.exports = {
  getPatientMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord
};