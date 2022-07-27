const { Sequelize } = require('sequelize');
// const chalk = require('chalk');

const DATABASE_URI = process.env.DATABASE_URI
if (!DATABASE_URI) {
  throw new Error('DATABASE_URI env variable not found')
}

const sequelize = new Sequelize(process.env.DATABASE_URI)
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully with PostgreSQL database ! ✅'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;