# Softlend Backend API

A production-ready REST API for Softlend Fintech platform built with Node.js, Express, and MySQL.

## Features

- **Customer Management**: Create and manage customer profiles with PAN and mobile verification
- **Credit Score Tracking**: Update and track customer CIBIL scores
- **Credit Gap Analysis**: Identify and manage credit improvement opportunities
- **Offer Management**: Create, manage, and track loan offers for customers
- **EMI Calculation**: Calculate monthly EMIs with comprehensive details
- **Validation**: Robust input validation with express-validator
- **Error Handling**: Global error handler with standardized responses
- **Logging**: Comprehensive request/response logging
- **Database Support**: MySQL with SQLite fallback support
- **Sequelize ORM**: Database modeling and migrations
- **Security**: Helmet.js, CORS, and input sanitization

## Tech Stack

- Node.js
- Express.js
- MySQL (with SQLite fallback)
- Sequelize ORM
- dotenv
- express-validator
- Morgan (logging)
- Helmet (security)
- CORS

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher) or SQLite
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd softlend-backend