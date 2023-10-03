const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Nik@1995', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
