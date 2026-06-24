const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';
const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  // SQLite fallback
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: isDevelopment ? console.log : false,
    define: {
      timestamps: true,
      underscored: true
    }
  });
} else {
  // MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: isDevelopment ? console.log : false,
      define: {
        timestamps: true,
        underscored: true
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;