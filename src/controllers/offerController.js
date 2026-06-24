const offerService = require('../services/offerService');
const { formatErrorResponse } = require('../utils/helpers');

class OfferController {
  /**
   * Create an offer for a customer
   */
  async createOffer(req, res, next) {
    try {
      const { id } = req.params;
      const offer = await offerService.createOffer(id, req.body);
      res.status(201).json({
        message: 'Offer created successfully',
        data: offer
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get offers for a customer
   */
  async getOffersByCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const offers = await offerService.getOffersByCustomer(id, status);
      res.status(200).json({
        message: 'Offers retrieved successfully',
        data: offers
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update offer status
   */
  async updateOfferStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const offer = await offerService.updateOfferStatus(id, status);
      res.status(200).json({
        message: 'Offer status updated successfully',
        data: offer
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get offer EMI details
   */
  async getOfferEMI(req, res, next) {
    try {
      const { id } = req.params;
      const emiDetails = await offerService.getOfferEMI(id);
      res.status(200).json({
        message: 'EMI details retrieved successfully',
        data: emiDetails
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get eligible offers for a customer (bonus)
   */
  async getEligibleOffers(req, res, next) {
    try {
      const { id } = req.params;
      const offers = await offerService.getEligibleOffers(id);
      res.status(200).json({
        message: 'Eligible offers retrieved successfully',
        data: offers
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get offer statistics (bonus)
   */
  async getOfferStats(req, res, next) {
    try {
      const stats = await offerService.getOfferStats();
      res.status(200).json({
        message: 'Offer statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OfferController();