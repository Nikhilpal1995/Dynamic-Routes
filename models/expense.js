const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
     description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    category: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
      },
});

module.exports = Expense;