const express = require('express');
const router = express.Router();

// Import route modules
const customerRoutes = require('./customerRoutes');
const creditGapRoutes = require('./creditGapRoutes');
const offerRoutes = require('./offerRoutes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Softlend Backend API'
  });
});

// Mount routes
router.use('/customers', customerRoutes);
router.use('/credit-gaps', creditGapRoutes);
router.use('/offers', offerRoutes);

module.exports = router;