const Prescription = require('../models/Prescription');
const asyncHandler = require('express-async-handler');

// Obtener todas las prescripciones de un paciente
const getPatientPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ patient: req.params.patientId })
    .populate('doctor', 'name specialty')
    .sort('-issueDate');
  res.json(prescriptions);
});

// Crear nueva prescripción
const createPrescription = asyncHandler(async (req, res) => {
  const {
    patientId,
    medications,
    diagnosis,
    validUntil
  } = req.body;

  const prescription = await Prescription.create({
    patient: patientId,
    doctor: req.user._id,
    medications,
    diagnosis,
    validUntil
  });

  if (prescription) {
    res.status(201).json(prescription);
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