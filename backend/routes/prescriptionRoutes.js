const express = require('express');
const router = express.Router();
const {
  getPatientPrescriptions,
  createPrescription,
  updatePrescriptionStatus
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Rutas simplificadas para evitar problemas con path-to-regexp
router.get('/patient/:patientId', protect, authorize(['doctor', 'admin']), getPatientPrescriptions);
router.post('/', protect, authorize(['doctor']), createPrescription);
router.put('/status/:id', protect, authorize(['doctor']), updatePrescriptionStatus);

module.exports = router;