const express = require('express');
const router = express.Router();
const {
  getPatientMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord
} = require('../controllers/medicalRecordController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/:patientId')
  .get(protect, authorize(['doctor', 'admin']), getPatientMedicalRecords);

router.route('/')
  .post(protect, authorize(['doctor']), createMedicalRecord);

router.route('/:id')
  .put(protect, authorize(['doctor']), updateMedicalRecord);

module.exports = router;