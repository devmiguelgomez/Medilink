const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

// Cargar variables de entorno antes de cualquier operación
dotenv.config();

// Rutas
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const clinicRoutes = require('./routes/clinicRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB solo si hay una URI configurada
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.warn('MONGO_URI no está configurada. La conexión a la base de datos no se establecerá.');
}

// Ruta raíz para verificación
app.get('/', (req, res) => {
  res.json({ message: 'API MediLink funcionando correctamente' });
});

// Definición de rutas API
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/clinics', clinicRoutes);

// Ruta de captura para cualquier otra solicitud
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Iniciar el servidor solo si no estamos en un entorno de prueba o en Vercel
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

// Exportar la app para Vercel
module.exports = app;