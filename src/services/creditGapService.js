const { CreditGap, Customer } = require('../models');
const { ERROR_CODES, CREDIT_GAP_STATUS } = require('../utils/constants');

class CreditGapService {
  /**
   * Create credit gaps for a customer
   */
  async createCreditGaps(customerId, gapsData) {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }

    const gaps = [];
    for (const gapData of gapsData) {
      const gap = await CreditGap.create({
        customer_id: customerId,
        ...gapData
      });
      gaps.push(gap);
    }

    return gaps;
  }

  /**
   * Get credit gaps by ID
   */
  async getCreditGapById(id) {
    const gap = await CreditGap.findByPk(id);
    if (!gap) {
      const error = new Error('Credit gap not found');
      error.statusCode = 404;
      error.errorCode = ERROR_CODES.NOT_FOUND;
      throw error;
    }
    return gap;
  }

  /**
   * Resolve a credit gap
   */
  async resolveCreditGap(id) {
    const gap = await this.getCreditGapById(id);
    
    if (gap.status === CREDIT_GAP_STATUS.RESOLVED) {
      const error = new Error('Credit gap already resolved');
      error.statusCode = 400;
      error.errorCode = ERROR_CODES.BAD_REQUEST;
      throw error;
    }

    gap.status = CREDIT_GAP_STATUS.RESOLVED;
    gap.resolved_at = new Date();
    await gap.save();

    return gap;
  }

  /**
   * Get credit gaps by customer
   */
  async getCreditGapsByCustomer(customerId, status = null) {
    const where = { customer_id: customerId };
    if (status) {
      where.status = status;
    }

    return await CreditGap.findAll({
      where,
      order: [['impact', 'DESC'], ['estimated_score_gain', 'DESC']]
    });
  }

  /**
   * Get unresolved credit gaps for a customer
   */
  async getUnresolvedGaps(customerId) {
    return await this.getCreditGapsByCustomer(customerId, CREDIT_GAP_STATUS.OPEN);
  }

  /**
   * Calculate total potential score gain from unresolved gaps
   */
  async getTotalPotentialGain(customerId) {
    const gaps = await this.getUnresolvedGaps(customerId);
    return gaps.reduce((sum, gap) => sum + (gap.estimated_score_gain || 0), 0);
  }

  /**
   * Get credit gap statistics
   */
  async getGapStats() {
    const total = await CreditGap.count();
    const resolved = await CreditGap.count({
      where: { status: CREDIT_GAP_STATUS.RESOLVED }
    });
    const open = await CreditGap.count({
      where: { status: CREDIT_GAP_STATUS.OPEN }
    });
    
    const avgGain = await CreditGap.findOne({
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('estimated_score_gain')), 'avg_gain']
      ],
      where: { status: CREDIT_GAP_STATUS.OPEN }
    });

    return {
      total_gaps: total,
      resolved_gaps: resolved,
      open_gaps: open,
      average_potential_gain: avgGain ? Math.round(avgGain.dataValues.avg_gain) : 0
    };
  }
}

module.exports = new CreditGapService();