const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { VALIDATION_RULES } = require('../utils/constants');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  mobile: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]{10}$/,
      len: [10, 10]
    }
  },
  pan: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      is: VALIDATION_RULES.PAN_REGEX
    }
  },
  cibil_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: VALIDATION_RULES.CIBIL_SCORE_MIN,
      max: VALIDATION_RULES.CIBIL_SCORE_MAX
    }
  },
  score_fetched_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'customers',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Customer;