const { Customer, CreditGap, Offer } = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');
const { ERROR_CODES } = require('../utils/constants');
const { calculatePotentialScore } = require('../utils/helpers');

class CustomerService {
async createCustomer(data) {
try {
return await Customer.create(data);
} catch (error) {
if (error.name === 'SequelizeUniqueConstraintError') {
const errorResponse = new Error('Mobile or PAN already exists');
errorResponse.statusCode = 409;
errorResponse.errorCode = ERROR_CODES.DUPLICATE_ENTRY;
throw errorResponse;
}
throw error;
}
}

async getCustomerById(id) {
const customer = await Customer.findByPk(id);

```
if (!customer) {
  const error = new Error('Customer not found');
  error.statusCode = 404;
  error.errorCode = ERROR_CODES.NOT_FOUND;
  throw error;
}

return customer;
```

}

async updateCreditScore(id, score) {
const customer = await this.getCustomerById(id);

```
customer.cibil_score = score;
customer.score_fetched_at = new Date();

await customer.save();

return customer;
```

}

async getCreditProfile(id) {
const customer = await this.getCustomerById(id);

```
const creditGaps = await CreditGap.findAll({
  where: {
    customer_id: id,
    status: 'open'
  },
  order: [['impact', 'DESC']]
});

const offers = await Offer.findAll({
  where: {
    customer_id: id
  },
  order: [['created_at', 'DESC']]
});

const potentialScore = calculatePotentialScore(
  customer.cibil_score || 0,
  creditGaps
);

const improvementSummary = this.getImprovementSummary(creditGaps);

return {
  customer,
  creditGaps,
  offers,
  potential_score: potentialScore,
  improvement_summary: improvementSummary
};
```

}

getImprovementSummary(gaps) {
const summary = {
total_estimated_gain: 0,
high_impact_count: 0,
medium_impact_count: 0,
low_impact_count: 0,
gap_factors: []
};

```
if (!gaps || gaps.length === 0) {
  return summary;
}

gaps.forEach(gap => {
  summary.total_estimated_gain += gap.estimated_score_gain || 0;

  switch (gap.impact) {
    case 'high':
      summary.high_impact_count++;
      break;

    case 'medium':
      summary.medium_impact_count++;
      break;

    case 'low':
      summary.low_impact_count++;
      break;
  }

  summary.gap_factors.push({
    factor: gap.factor,
    impact: gap.impact,
    estimated_gain: gap.estimated_score_gain
  });
});

return summary;
```

}

async getLowScoreCustomers(threshold = 600) {
return await Customer.findAll({
where: {
cibil_score: {
[Op.lt]: threshold
}
},
order: [['cibil_score', 'ASC']]
});
}

async getCustomerStats() {
const total = await Customer.count();


const withScore = await Customer.count({
  where: {
    cibil_score: {
      [Op.not]: null
    }
  }
});

const avgScore = await Customer.findOne({
  attributes: [
    [
      sequelize.fn('AVG', sequelize.col('cibil_score')),
      'avg_score'
    ]
  ],
  where: {
    cibil_score: {
      [Op.not]: null
    }
  }
});

return {
  total_customers: total,
  customers_with_score: withScore,
  average_score:
    avgScore &&
    avgScore.dataValues &&
    avgScore.dataValues.avg_score
      ? Math.round(avgScore.dataValues.avg_score)
      : 0
};


}
}

module.exports = new CustomerService();
