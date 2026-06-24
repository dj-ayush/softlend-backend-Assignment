const moment = require('moment');

/**
 * Calculate EMI
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate in percentage
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {number} Monthly EMI amount
 */
const calculateEMI = (principal, annualRate, tenureMonths) => {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
  
  return Math.round(numerator / denominator * 100) / 100;
};

/**
 * Calculate potential score
 * @param {number} currentScore - Current CIBIL score
 * @param {Array} openGaps - Array of open credit gaps
 * @returns {number} Potential score
 */
const calculatePotentialScore = (currentScore, openGaps) => {
  if (!openGaps || !Array.isArray(openGaps)) {
    return currentScore;
  }

  const totalGain = openGaps.reduce((sum, gap) => sum + (gap.estimated_score_gain || 0), 0);
  return Math.min(currentScore + totalGain, 900); // Cap at max CIBIL score
};

/**
 * Check if customer is locked for an offer
 * @param {number} customerScore - Customer's CIBIL score
 * @param {number} minScoreRequired - Minimum score required for the offer
 * @returns {boolean} True if locked
 */
const isCustomerLocked = (customerScore, minScoreRequired) => {
  return customerScore < minScoreRequired;
};

/**
 * Calculate score gap
 * @param {number} minScoreRequired - Minimum score required for the offer
 * @param {number} customerScore - Customer's CIBIL score
 * @returns {number} Score gap
 */
const calculateScoreGap = (minScoreRequired, customerScore) => {
  return Math.max(0, minScoreRequired - customerScore);
};

/**
 * Format error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @returns {Object} Formatted error response
 */
const formatErrorResponse = (message, code) => {
  return {
    error: message,
    code: code
  };
};

/**
 * Generate unique ID
 * @returns {string} UUID
 */
const generateId = () => {
  const { v4: uuidv4 } = require('uuid');
  return uuidv4();
};

/**
 * Validate PAN card format
 * @param {string} pan - PAN number
 * @returns {boolean} Valid or not
 */
const isValidPAN = (pan) => {
  const { VALIDATION_RULES } = require('./constants');
  return VALIDATION_RULES.PAN_REGEX.test(pan);
};

/**
 * Validate mobile number
 * @param {string} mobile - Mobile number
 * @returns {boolean} Valid or not
 */
const isValidMobile = (mobile) => {
  const { VALIDATION_RULES } = require('./constants');
  return /^[0-9]{10}$/.test(mobile) && mobile.length === VALIDATION_RULES.MOBILE_LENGTH;
};

/**
 * Format date for response
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Check if status transition is valid
 * @param {string} currentStatus - Current status
 * @param {string} newStatus - New status
 * @param {Object} statusTransitions - Status transition rules
 * @returns {boolean} Valid transition or not
 */
const isValidStatusTransition = (currentStatus, newStatus, statusTransitions) => {
  const allowedTransitions = statusTransitions[currentStatus] || [];
  return allowedTransitions.includes(newStatus);
};

module.exports = {
  calculateEMI,
  calculatePotentialScore,
  isCustomerLocked,
  calculateScoreGap,
  formatErrorResponse,
  generateId,
  isValidPAN,
  isValidMobile,
  formatDate,
  isValidStatusTransition
};