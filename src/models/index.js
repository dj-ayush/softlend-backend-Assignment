const sequelize = require('../config/database');
const Customer = require('./Customer');
const CreditGap = require('./CreditGap');
const Offer = require('./Offer');

// Define associations
Customer.hasMany(CreditGap, {
  foreignKey: 'customer_id',
  as: 'creditGaps'
});

CreditGap.belongsTo(Customer, {
  foreignKey: 'customer_id',
  as: 'customer'
});

Customer.hasMany(Offer, {
  foreignKey: 'customer_id',
  as: 'offers'
});

Offer.belongsTo(Customer, {
  foreignKey: 'customer_id',
  as: 'customer'
});

module.exports = {
  sequelize,
  Customer,
  CreditGap,
  Offer
};