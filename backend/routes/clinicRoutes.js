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
  .get(getClinics)
  .post(protect, authorize(['admin']), createClinic);

router.route('/:id')
  .get(getClinicById)
  .put(protect, authorize(['admin']), updateClinic);

module.exports = router;