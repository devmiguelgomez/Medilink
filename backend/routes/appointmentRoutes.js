const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Importaríamos un controlador de citas aquí
// const { getAppointments, createAppointment, ... } = require('../controllers/appointmentController');

// Rutas temporales para prueba
router.get('/', (req, res) => {
  res.json({ message: 'API de citas funcionando' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Crear cita: OK', data: req.body });
});

// Estas serían las rutas reales cuando implementemos los controladores
// router.route('/')
//   .get(protect, getAppointments)
//   .post(protect, createAppointment);

// router.route('/:id')
//   .get(protect, getAppointmentById)
//   .put(protect, updateAppointment)
//   .delete(protect, cancelAppointment);

module.exports = router;