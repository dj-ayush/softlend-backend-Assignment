const creditGapService = require('../services/creditGapService');
const { formatErrorResponse } = require('../utils/helpers');

class CreditGapController {
  /**
   * Resolve a credit gap
   */
  async resolveCreditGap(req, res, next) {
    try {
      const { id } = req.params;
      const gap = await creditGapService.resolveCreditGap(id);
      res.status(200).json({
        message: 'Credit gap resolved successfully',
        data: gap
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get credit gaps for a customer
   */
  async getCreditGapsByCustomer(req, res, next) {
    try {
      const { customerId } = req.params;
      const { status } = req.query;
      const gaps = await creditGapService.getCreditGapsByCustomer(customerId, status);
      res.status(200).json({
        message: 'Credit gaps retrieved successfully',
        data: gaps
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get credit gap statistics (bonus)
   */
  async getGapStats(req, res, next) {
    try {
      const stats = await creditGapService.getGapStats();
      res.status(200).json({
        message: 'Credit gap statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CreditGapController();