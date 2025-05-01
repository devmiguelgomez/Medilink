const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Permitir todas las solicitudes en desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

module.exports = cors(corsOptions);
