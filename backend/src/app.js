// Importaciones necesarias
const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middleware/cors.middleware');
const { Pool } = require('pg');

const app = express();

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'medilink'
});

// Verificar conexión a la base de datos al inicio
pool.connect()
  .then(() => console.log('Conexión a PostgreSQL establecida'))
  .catch(err => console.error('Error al conectar a PostgreSQL:', err));

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

// Ruta para verificar la conexión a la base de datos
app.get('/check-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      message: 'Conexión a la base de datos establecida',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al conectar a la base de datos',
      error: error.message
    });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});