const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Simplificar el middleware para evitar errores en producción
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];
      
      // Verificar el token
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET no está configurado en el servidor');
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Obtener usuario sin la contraseña
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error('Error de autenticación:', error);
      res.status(401);
      throw new Error('No autorizado, token inválido');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, sin token de acceso');
  }
});

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('No autorizado, usuario no autenticado');
    }

    if (roles.length && !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`No autorizado, se requiere uno de estos roles: ${roles.join(', ')}`);
    }

    next();
  };
};

module.exports = { protect, authorize };