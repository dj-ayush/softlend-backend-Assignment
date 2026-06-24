'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_gaps', {
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
      factor: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      current_value: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      ideal_value: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      impact: {
        type: Sequelize.ENUM('high', 'medium', 'low'),
        allowNull: false,
        defaultValue: 'medium'
      },
      estimated_score_gain: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 100
        }
      },
      action_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('open', 'resolved'),
        allowNull: false,
        defaultValue: 'open'
      },
      resolved_at: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.addIndex('credit_gaps', ['customer_id']);
    await queryInterface.addIndex('credit_gaps', ['status']);
    await queryInterface.addIndex('credit_gaps', ['impact']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_gaps');
  }
};