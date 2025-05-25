const MedicalRecord = require('../models/MedicalRecord');
const asyncHandler = require('express-async-handler');

// Obtener historial médico de un paciente
const getPatientMedicalRecords = asyncHandler(async (req, res) => {
  const records = await MedicalRecord.find({ patient: req.params.patientId })
    .populate('doctor', 'name specialty')
    .sort('-date');
  res.json(records);
});

// Crear nuevo registro médico
const createMedicalRecord = asyncHandler(async (req, res) => {
  const {
    patientId,
    diagnosis,
    observations,
    treatments,
    examinations
  } = req.body;

  const record = await MedicalRecord.create({
    patient: patientId,
    doctor: req.user._id,
    diagnosis,
    observations,
    treatments,
    examinations
  });

  if (record) {
    res.status(201).json(record);
  } else {
    res.status(400);
    throw new Error('Datos de registro médico inválidos');
  }
});

// Actualizar registro médico
const updateMedicalRecord = asyncHandler(async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (record) {
    record.diagnosis = req.body.diagnosis || record.diagnosis;
    record.observations = req.body.observations || record.observations;
    record.treatments = req.body.treatments || record.treatments;
    record.examinations = req.body.examinations || record.examinations;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } else {
    res.status(404);
    throw new Error('Registro médico no encontrado');
  }
});

module.exports = {
  getPatientMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord
};