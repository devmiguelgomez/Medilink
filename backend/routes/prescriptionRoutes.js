const express = require('express');
const router = express.Router();
const {
  getPatientPrescriptions,
  createPrescription,
  updatePrescriptionStatus
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/patient/:patientId')
  .get(protect, authorize(['doctor', 'admin']), getPatientPrescriptions);

router.route('/')
  .post(protect, authorize(['doctor']), createPrescription);

router.route('/:id/status')
  .put(protect, authorize(['doctor']), updatePrescriptionStatus);

module.exports = router;