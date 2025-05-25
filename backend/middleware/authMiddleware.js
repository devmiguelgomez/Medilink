const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token inválido o expirado');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, sin token');
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
      throw new Error('No autorizado, permisos insuficientes');
    }

    next();
  };
};

module.exports = { protect, authorize };