const express = require('express');
const router = express.Router();
const creditGapController = require('../controllers/creditGapController');
const { validate, creditGapValidation } = require('../middlewares/validation');

// PATCH /credit-gaps/:id/resolve - Resolve a credit gap
router.patch(
  '/:id/resolve',
  creditGapValidation.resolve,
  validate,
  creditGapController.resolveCreditGap
);

// GET /credit-gaps/customer/:customerId - Get credit gaps for a customer
router.get(
  '/customer/:customerId',
  creditGapController.getCreditGapsByCustomer
);

// GET /credit-gaps/stats - Get credit gap statistics (Bonus)
router.get(
  '/stats',
  creditGapController.getGapStats
);

module.exports = router;