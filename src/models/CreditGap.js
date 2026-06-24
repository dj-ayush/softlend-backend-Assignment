const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { CREDIT_GAP_STATUS, IMPACT_LEVELS } = require('../utils/constants');

const CreditGap = sequelize.define('CreditGap', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  customer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  factor: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  current_value: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ideal_value: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  impact: {
    type: DataTypes.ENUM,
    values: Object.values(IMPACT_LEVELS),
    allowNull: false,
    defaultValue: IMPACT_LEVELS.MEDIUM
  },
  estimated_score_gain: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100
    }
  },
  action_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(CREDIT_GAP_STATUS),
    allowNull: false,
    defaultValue: CREDIT_GAP_STATUS.OPEN
  },
  resolved_at: {
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
  tableName: 'credit_gaps',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CreditGap;