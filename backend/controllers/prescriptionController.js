const Prescription = require('../models/Prescription');
const asyncHandler = require('express-async-handler');

// Obtener todas las prescripciones de un paciente
const getPatientPrescriptions = asyncHandler(async (req, res) => {
  let query = {};
  
  // Si es un paciente, solo mostrar sus prescripciones
  if (req.user.role === 'patient') {
    query.patient = req.user._id;
  }
  // Si es un doctor, mostrar las prescripciones que ha creado
  else if (req.user.role === 'doctor') {
    query.doctor = req.user._id;
  }
  // Si es admin, mostrar todas las prescripciones
  // No se agrega condición para admin, se muestran todas

  const prescriptions = await Prescription.find(query)
    .populate('doctor', 'name specialty')
    .populate('patient', 'name')
    .sort('-issueDate');
  res.json(prescriptions);
});

// Crear nueva prescripción
const createPrescription = asyncHandler(async (req, res) => {
  const {
    patientId,
    medications,
    instructions,
    diagnosis,
    validUntil
  } = req.body;

  const prescription = await Prescription.create({
    patient: patientId,
    doctor: req.user._id,
    medications,
    instructions,
    diagnosis,
    validUntil
  });

  if (prescription) {
    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate('doctor', 'name specialty')
      .populate('patient', 'name');
    res.status(201).json(populatedPrescription);
  } else {
    res.status(400);
    throw new Error('Datos de prescripción inválidos');
  }
});

// Actualizar estado de prescripción
const updatePrescriptionStatus = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    prescription.status = req.body.status;
    const updatedPrescription = await prescription.save();
    res.json(updatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescripción no encontrada');
  }
});

module.exports = {
  getPatientPrescriptions,
  createPrescription,
  updatePrescriptionStatus
};