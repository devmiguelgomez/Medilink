const express = require('express');
const router = express.Router();
const {
  getPatientMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord
} = require('../controllers/medicalRecordController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Rutas simplificadas para evitar problemas con path-to-regexp
router.get('/patient/:patientId', protect, authorize(['doctor', 'admin', 'patient']), getPatientMedicalRecords);
router.post('/', protect, authorize(['doctor']), createMedicalRecord);
router.put('/update/:id', protect, authorize(['doctor']), updateMedicalRecord);

module.exports = router;