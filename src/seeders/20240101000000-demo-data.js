'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate UUIDs for customers
    const customer1Id = uuidv4();
    const customer2Id = uuidv4();
    const customer3Id = uuidv4();

    // Insert customers
    await queryInterface.bulkInsert('customers', [
      {
        id: customer1Id,
        name: 'Rahul Sharma',
        mobile: '9876543210',
        pan: 'ABCDE1234F',
        cibil_score: 650,
        score_fetched_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: customer2Id,
        name: 'Priya Patel',
        mobile: '9876543211',
        pan: 'FGHIJ5678K',
        cibil_score: 580,
        score_fetched_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: customer3Id,
        name: 'Amit Kumar',
        mobile: '9876543212',
        pan: 'LMNOP9012Q',
        cibil_score: 720,
        score_fetched_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insert credit gaps
    await queryInterface.bulkInsert('credit_gaps', [
      {
        id: uuidv4(),
        customer_id: customer1Id,
        factor: 'Credit Utilization Ratio',
        current_value: '85%',
        ideal_value: 'Below 30%',
        impact: 'high',
        estimated_score_gain: 45,
        action_description: 'Reduce credit card balances to below 30% of total limit',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer1Id,
        factor: 'Payment History',
        current_value: '1 late payment in last 12 months',
        ideal_value: '0 late payments',
        impact: 'medium',
        estimated_score_gain: 25,
        action_description: 'Set up automatic payments to avoid future late payments',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer2Id,
        factor: 'Credit Age',
        current_value: '2 years',
        ideal_value: '5+ years',
        impact: 'medium',
        estimated_score_gain: 30,
        action_description: 'Maintain oldest credit accounts to increase average credit age',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer2Id,
        factor: 'Recent Credit Inquiries',
        current_value: '5 inquiries in last 6 months',
        ideal_value: '0-2 inquiries',
        impact: 'low',
        estimated_score_gain: 15,
        action_description: 'Avoid applying for new credit for the next 6 months',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer3Id,
        factor: 'Credit Mix',
        current_value: 'Only credit cards',
        ideal_value: 'Mix of credit cards and installment loans',
        impact: 'low',
        estimated_score_gain: 20,
        action_description: 'Consider a small installment loan to diversify credit mix',
        status: 'resolved',
        resolved_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insert offers
    await queryInterface.bulkInsert('offers', [
      {
        id: uuidv4(),
        customer_id: customer1Id,
        lender: 'HDFC Bank',
        amount: 500000.00,
        interest_rate: 10.50,
        tenure_months: 36,
        min_score_required: 650,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer1Id,
        lender: 'ICICI Bank',
        amount: 750000.00,
        interest_rate: 11.00,
        tenure_months: 48,
        min_score_required: 680,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer3Id,
        lender: 'SBI',
        amount: 1000000.00,
        interest_rate: 9.75,
        tenure_months: 60,
        min_score_required: 700,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        customer_id: customer2Id,
        lender: 'Axis Bank',
        amount: 300000.00,
        interest_rate: 12.00,
        tenure_months: 24,
        min_score_required: 600,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('offers', null, {});
    await queryInterface.bulkDelete('credit_gaps', null, {});
    await queryInterface.bulkDelete('customers', null, {});
  }
};