const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('todo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports = sequelize;