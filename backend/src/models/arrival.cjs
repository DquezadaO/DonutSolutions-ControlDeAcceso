'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Arrival extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Arrival.init(
    {
      externalId: DataTypes.INTEGER,
      visitId: DataTypes.INTEGER,
      providerId: DataTypes.INTEGER,
      arrivalTime: DataTypes.DATE,
      residentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'arrival',
    },
  );
  return Arrival;
};
