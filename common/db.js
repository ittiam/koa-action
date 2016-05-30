var Sequelize = require('sequelize');
var config = require('../config/config');

const dbHost = config.db.host;
const dbPort = config.db.port;
const dbUsername = config.db.username;
const dbPassword = config.db.password;
const dbName = config.db.name;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  port: dbPort,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

module.exports = sequelize;
