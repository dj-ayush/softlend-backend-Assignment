const { Offer, Customer } = require('../models');
const { ERROR_CODES } = require('../utils/constants');

class OfferService {
  /**
   * Create Offer
   */
  async createOffer(customerId, offerData) {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }

    const offer = await Offer.create({
      customer_id: customerId,
      lender: offerData.lender,
      amount: offerData.amount,
      interest_rate: offerData.interest_rate,
      tenure_months: offerData.tenure_months,
      min_score_required: offerData.min_score_required
    });

    return offer;
  }

  /**
   * Get offers by customer
   */
  async getOffersByCustomer(customerId, status = null) {
    const whereClause = {
      customer_id: customerId
    };

    if (status) {
      whereClause.status = status;
    }

    return await Offer.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Update offer status
   */
  async updateOfferStatus(id, status) {
    const offer = await Offer.findByPk(id);

    if (!offer) {
      const error = new Error('Offer not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }

    offer.status = status;

    await offer.save();

    return offer;
  }

  /**
   * EMI Calculator
   */
  async getOfferEMI(id) {
    const offer = await Offer.findByPk(id);

    if (!offer) {
      const error = new Error('Offer not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }

    const principal = parseFloat(offer.amount);
    const annualRate = parseFloat(offer.interest_rate);
    const months = parseInt(offer.tenure_months);

    const monthlyRate = annualRate / 12 / 100;

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return {
      offer_id: offer.id,
      lender: offer.lender,
      amount: principal,
      interest_rate: annualRate,
      tenure_months: months,
      emi: Number(emi.toFixed(2))
    };
  }

  /**
   * Eligible offers
   */
  async getEligibleOffers(customerId) {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }

    return await Offer.findAll({
      where: {
        customer_id: customerId
      }
    });
  }

  /**
   * Offer stats
   */
  async getOfferStats() {
    const totalOffers = await Offer.count();

    const pendingOffers = await Offer.count({
      where: {
        status: 'pending'
      }
    });

    const activeOffers = await Offer.count({
      where: {
        status: 'active'
      }
    });

    const disbursedOffers = await Offer.count({
      where: {
        status: 'disbursed'
      }
    });

    return {
      total_offers: totalOffers,
      pending_offers: pendingOffers,
      active_offers: activeOffers,
      disbursed_offers: disbursedOffers
    };
  }
}

module.exports = new OfferService();