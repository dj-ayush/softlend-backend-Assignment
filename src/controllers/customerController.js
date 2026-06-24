const customerService = require('../services/customerService');
const creditGapService = require('../services/creditGapService');
const offerService = require('../services/offerService');
const { formatErrorResponse } = require('../utils/helpers');

class CustomerController {
  /**
   * Create a new customer
   */
  async createCustomer(req, res, next) {
    try {
      const customer = await customerService.createCustomer(req.body);
      res.status(201).json({
        message: 'Customer created successfully',
        data: customer
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update customer credit score
   */
  async updateCreditScore(req, res, next) {
    try {
      const { id } = req.params;
      const { score } = req.body;
      
      const customer = await customerService.updateCreditScore(id, score);
      res.status(200).json({
        message: 'Credit score updated successfully',
        data: customer
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create credit gaps for a customer
   */
  async createCreditGaps(req, res, next) {
    try {
      const { id } = req.params;
      const gapsData = req.body.gaps || req.body;
      
      const gaps = await creditGapService.createCreditGaps(id, gapsData);
      res.status(201).json({
        message: 'Credit gaps created successfully',
        data: gaps
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get customer credit profile
   */
  async getCreditProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await customerService.getCreditProfile(id);
      res.status(200).json({
        message: 'Credit profile retrieved successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get customer improvement summary
   */
  async getImprovementSummary(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await customerService.getCustomerById(id);
      const gaps = await creditGapService.getUnresolvedGaps(id);
      const summary = customerService.getImprovementSummary(gaps);
      
      res.status(200).json({
        message: 'Improvement summary retrieved successfully',
        data: {
          customer_id: id,
          current_score: customer.cibil_score,
          ...summary
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get customer statistics (bonus)
   */
  async getCustomerStats(req, res, next) {
    try {
      const stats = await customerService.getCustomerStats();
      res.status(200).json({
        message: 'Customer statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();