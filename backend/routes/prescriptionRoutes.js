const express = require('express');
const router = express.Router();
const {
  getPatientPrescriptions,
  createPrescription,
  updatePrescriptionStatus
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all prescriptions (filtered by role)
router.get('/', protect, authorize(['doctor', 'admin']), getPatientPrescriptions);

// Get prescriptions for a specific patient
router.get('/patient/:patientId', protect, authorize(['doctor', 'admin']), getPatientPrescriptions);

// Create new prescription
router.post('/', protect, authorize(['doctor']), createPrescription);

// Update prescription status
router.put('/status/:id', protect, authorize(['doctor']), updatePrescriptionStatus);

module.exports = router;