const Sequelize = require('sequelize');
require('dotenv').config();
//process.env connects to the dotenv file
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
module.exports = sequelize;