const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const configDatabase = require('../config/database.cjs');

const basename = path.basename(__filename);
const config = configDatabase[process.env.NODE_ENV || 'development'];
const db = {};

const sequelizeConfig = config.use_env_variable ? process.env[config.use_env_variable] : config;
const sequelize = new Sequelize(sequelizeConfig);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-4) === '.cjs')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
