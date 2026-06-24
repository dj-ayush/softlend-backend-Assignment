const { body, param, query, validationResult } = require('express-validator');
const { ERROR_CODES } = require('../utils/constants');

/**
 * Validation middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(error => error.msg);
    return res.status(400).json({
      error: messages.join(', '),
      code: ERROR_CODES.VALIDATION_ERROR
    });
  }
  next();
};

// Customer validation rules
const customerValidation = {
  create: [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('mobile')
      .notEmpty().withMessage('Mobile number is required')
      .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits')
      .matches(/^[0-9]{10}$/).withMessage('Mobile number must contain only digits'),
    body('pan')
      .notEmpty().withMessage('PAN is required')
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN format. Format: ABCDE1234F')
  ],
  creditScore: [
    param('id')
      .notEmpty().withMessage('Customer ID is required')
      .isUUID().withMessage('Invalid customer ID format')
  ],
  creditGaps: [
    param('id')
      .notEmpty().withMessage('Customer ID is required')
      .isUUID().withMessage('Invalid customer ID format')
  ],
  creditProfile: [
    param('id')
      .notEmpty().withMessage('Customer ID is required')
      .isUUID().withMessage('Invalid customer ID format')
  ],
  offers: [
    param('id')
      .notEmpty().withMessage('Customer ID is required')
      .isUUID().withMessage('Invalid customer ID format')
  ]
};

// Credit gap validation rules
const creditGapValidation = {
  resolve: [
    param('id')
      .notEmpty().withMessage('Credit gap ID is required')
      .isUUID().withMessage('Invalid credit gap ID format')
  ]
};

// Offer validation rules
const offerValidation = {
  create: [
    param('id')
      .notEmpty().withMessage('Customer ID is required')
      .isUUID().withMessage('Invalid customer ID format'),
    body('lender')
      .notEmpty().withMessage('Lender is required')
      .isLength({ min: 2, max: 100 }).withMessage('Lender must be between 2 and 100 characters'),
    body('amount')
      .notEmpty().withMessage('Amount is required')
      .isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('interest_rate')
      .notEmpty().withMessage('Interest rate is required')
      .isFloat({ min: 0, max: 100 }).withMessage('Interest rate must be between 0 and 100'),
    body('tenure_months')
      .notEmpty().withMessage('Tenure months is required')
      .isInt({ min: 1, max: 360 }).withMessage('Tenure must be between 1 and 360 months'),
    body('min_score_required')
      .notEmpty().withMessage('Minimum score required is required')
      .isInt({ min: 300, max: 900 }).withMessage('Minimum score must be between 300 and 900')
  ],
  updateStatus: [
    param('id')
      .notEmpty().withMessage('Offer ID is required')
      .isUUID().withMessage('Invalid offer ID format'),
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'active', 'disbursed']).withMessage('Invalid status. Must be pending, active, or disbursed')
  ],
  emi: [
    param('id')
      .notEmpty().withMessage('Offer ID is required')
      .isUUID().withMessage('Invalid offer ID format')
  ]
};

module.exports = {
  validate,
  customerValidation,
  creditGapValidation,
  offerValidation
};