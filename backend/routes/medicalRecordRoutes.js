const express = require('express');
const router = express.Router();
const {
  getPatientMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord
} = require('../controllers/medicalRecordController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all medical records (filtered by role)
router.get('/', protect, authorize(['doctor', 'admin', 'patient']), getPatientMedicalRecords);

// Get medical records for a specific patient
router.get('/patient/:patientId', protect, authorize(['doctor', 'admin']), getPatientMedicalRecords);

// Create new medical record
router.post('/', protect, authorize(['doctor']), createMedicalRecord);

// Update medical record
router.put('/:id', protect, authorize(['doctor']), updateMedicalRecord);

module.exports = router;