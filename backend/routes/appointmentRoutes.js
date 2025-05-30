const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getCompletedAppointments,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Rutas básicas - evitamos expresiones regulares complejas
router.get('/', (req, res) => {
  res.json({ message: 'API de citas funcionando', success: true });
});

router.post('/', (req, res) => {
  res.json({ message: 'Crear cita: OK', data: req.body });
});

// Rutas para operaciones específicas
router.get('/list', (req, res) => {
  res.json({ message: 'Lista de citas', data: [] });
});

router.get('/detail/:id', (req, res) => {
  res.json({ message: `Detalle de cita ${req.params.id}`, data: { id: req.params.id } });
});

router.put('/update/:id', (req, res) => {
  res.json({ message: `Actualizar cita ${req.params.id}`, data: req.body });
});

router.delete('/remove/:id', (req, res) => {
  res.json({ message: `Eliminar cita ${req.params.id}`, success: true });
});

// Get all appointments (filtered by role)
router.get('/', protect, authorize(['doctor', 'admin', 'patient']), getAppointments);

// Get completed appointments
router.get('/completed', protect, authorize(['doctor', 'admin']), getCompletedAppointments);

// Create new appointment
router.post('/create', protect, authorize(['patient']), createAppointment);

// Update appointment status
router.put('/:id/status', protect, authorize(['doctor', 'admin']), updateAppointmentStatus);

// Cancel appointment
router.put('/:id/cancel', protect, authorize(['doctor', 'admin', 'patient']), cancelAppointment);

module.exports = router;