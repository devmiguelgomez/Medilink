const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router.route('/:id/status')
  .put(protect, authorize(['doctor', 'admin']), updateAppointmentStatus);

module.exports = router;