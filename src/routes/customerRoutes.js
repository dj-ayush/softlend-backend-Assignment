const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validate, customerValidation } = require('../middlewares/validation');

// POST /customers - Create a new customer
router.post(
  '/',
  customerValidation.create,
  validate,
  customerController.createCustomer
);

// POST /customers/:id/credit-score - Update customer credit score
router.post(
  '/:id/credit-score',
  customerValidation.creditScore,
  validate,
  customerController.updateCreditScore
);

// POST /customers/:id/credit-gaps - Create credit gaps for a customer
router.post(
  '/:id/credit-gaps',
  customerValidation.creditGaps,
  validate,
  customerController.createCreditGaps
);

// GET /customers/:id/credit-profile - Get customer credit profile
router.get(
  '/:id/credit-profile',
  customerValidation.creditProfile,
  validate,
  customerController.getCreditProfile
);

// GET /customers/:id/improvement-summary - Get improvement summary (Bonus)
router.get(
  '/:id/improvement-summary',
  customerValidation.creditProfile,
  validate,
  customerController.getImprovementSummary
);

// GET /customers/stats - Get customer statistics (Bonus)
router.get(
  '/stats',
  customerController.getCustomerStats
);

module.exports = router;