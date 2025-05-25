const express = require('express');
const router = express.Router();
const {
  getClinics,
  getClinicById,
  createClinic,
  updateClinic
} = require('../controllers/clinicController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Rutas simplificadas para evitar problemas con path-to-regexp
router.get('/', getClinics);
router.post('/', protect, authorize(['admin']), createClinic);
router.get('/detail/:id', getClinicById);
router.put('/update/:id', protect, authorize(['admin']), updateClinic);

module.exports = router;