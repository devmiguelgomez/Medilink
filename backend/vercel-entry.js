// Este archivo actúa como punto de entrada específico para Vercel
// Ayuda a evitar problemas con path-to-regexp y otras dependencias

// Configuración de manejo de errores global
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rechazo no manejado en:', promise, 'razón:', reason);
});

// Importar y exportar el servidor Express
const app = require('./server');

// En Vercel, exportamos la aplicación Express
module.exports = app;
