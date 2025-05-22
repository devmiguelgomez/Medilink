const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// Registro de usuario
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, documentId, dateOfBirth, contactInfo } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Usuario ya existe');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    documentId,
    dateOfBirth,
    contactInfo
  });

  if (user) {
    // Crear perfil específico según el rol
    if (role === 'patient') {
      await Patient.create({ user: user._id });
    } else if (role === 'doctor') {
      await Doctor.create({ 
        user: user._id,
        specialty: req.body.specialty,
        medicalLicense: req.body.medicalLicense
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

// Login de usuario
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Email o contraseña inválidos');
  }
});

// Obtener perfil de usuario
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      documentId: user.documentId,
      dateOfBirth: user.dateOfBirth,
      contactInfo: user.contactInfo
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};