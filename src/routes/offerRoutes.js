const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { validate, offerValidation } = require('../middlewares/validation');

// POST /customers/:id/offers - Create an offer for a customer
router.post(
  '/customers/:id/offers',
  offerValidation.create,
  validate,
  offerController.createOffer
);

// GET /customers/:id/offers - Get offers for a customer
router.get(
  '/customers/:id/offers',
  offerController.getOffersByCustomer
);

// GET /offers/:id/emi - Get offer EMI details
router.get(
  '/:id/emi',
  offerValidation.emi,
  validate,
  offerController.getOfferEMI
);

// PATCH /offers/:id/status - Update offer status
router.patch(
  '/:id/status',
  offerValidation.updateStatus,
  validate,
  offerController.updateOfferStatus
);

// GET /offers/eligible/:id - Get eligible offers for a customer (Bonus)
router.get(
  '/eligible/:id',
  offerController.getEligibleOffers
);

// GET /offers/stats - Get offer statistics (Bonus)
router.get(
  '/stats',
  offerController.getOfferStats
);

module.exports = router;