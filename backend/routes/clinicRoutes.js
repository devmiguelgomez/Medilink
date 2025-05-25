const express = require('express');
const router = express.Router();
const {
  getClinics,
  getClinicById,
  createClinic,
  updateClinic
} = require('../controllers/clinicController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getClinics)
  .post(protect, authorize(['admin']), createClinic);

router.route('/:id')
  .get(protect, getClinicById)
  .put(protect, authorize(['admin']), updateClinic);

module.exports = router;