'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lender: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      interest_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      tenure_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 360
        }
      },
      min_score_required: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 300,
          max: 900
        }
      },
      status: {
        type: Sequelize.ENUM('pending', 'active', 'disbursed'),
        allowNull: false,
        defaultValue: 'pending'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('offers', ['customer_id']);
    await queryInterface.addIndex('offers', ['status']);
    await queryInterface.addIndex('offers', ['min_score_required']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('offers');
  }
};