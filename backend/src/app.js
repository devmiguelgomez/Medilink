// Importaciones necesarias
const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();

// Configuración de CORS - debe ir antes de las rutas
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// Aplicar middleware de CORS antes de definir las rutas
app.use(corsMiddleware);

// Configuración para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir rutas...
// Aquí puedes definir tus rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a Medilink Backend');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});