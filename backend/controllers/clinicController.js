const Clinic = require('../models/Clinic');
const asyncHandler = require('express-async-handler');

// Obtener todas las clínicas
const getClinics = asyncHandler(async (req, res) => {
  const clinics = await Clinic.find({});
  res.json(clinics);
});

// Obtener una clínica por ID
const getClinicById = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);
  if (clinic) {
    res.json(clinic);
  } else {
    res.status(404);
    throw new Error('Clínica no encontrada');
  }
});

// Crear una nueva clínica
const createClinic = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    contactInfo,
    operatingHours,
    facilities,
    specialties
  } = req.body;

  const clinic = await Clinic.create({
    name,
    location,
    contactInfo,
    operatingHours,
    facilities,
    specialties
  });

  if (clinic) {
    res.status(201).json(clinic);
  } else {
    res.status(400);
    throw new Error('Datos de clínica inválidos');
  }
});

// Actualizar una clínica
const updateClinic = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);

  if (clinic) {
    clinic.name = req.body.name || clinic.name;
    clinic.location = req.body.location || clinic.location;
    clinic.contactInfo = req.body.contactInfo || clinic.contactInfo;
    clinic.operatingHours = req.body.operatingHours || clinic.operatingHours;
    clinic.facilities = req.body.facilities || clinic.facilities;
    clinic.specialties = req.body.specialties || clinic.specialties;

    const updatedClinic = await clinic.save();
    res.json(updatedClinic);
  } else {
    res.status(404);
    throw new Error('Clínica no encontrada');
  }
});

module.exports = {
  getClinics,
  getClinicById,
  createClinic,
  updateClinic
};