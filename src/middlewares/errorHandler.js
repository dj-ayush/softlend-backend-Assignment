const { ERROR_CODES } = require('../utils/constants');
const { formatErrorResponse } = require('../utils/helpers');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default error
  let statusCode = 500;
  let errorCode = ERROR_CODES.INTERNAL_ERROR;
  let message = 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
    message = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    errorCode = ERROR_CODES.DUPLICATE_ENTRY;
    message = 'Duplicate entry found. Please use unique values.';
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    errorCode = ERROR_CODES.BAD_REQUEST;
    message = 'Invalid reference. The related record does not exist.';
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    errorCode = err.errorCode || ERROR_CODES.BAD_REQUEST;
    message = err.message;
  }
  
  // Log error details
  console.error(`Error Details:`, {
    statusCode,
    errorCode,
    message,
    stack: err.stack
  });
  
  res.status(statusCode).json(formatErrorResponse(message, errorCode));
};

module.exports = errorHandler;