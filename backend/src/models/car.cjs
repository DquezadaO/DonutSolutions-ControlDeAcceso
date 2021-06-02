'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.unit);
    }
  }
  Car.init(
    {
      licensePlate: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      carBrand: DataTypes.STRING,
      carModel: DataTypes.STRING,
      carColor: DataTypes.STRING,
      unitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'car',
    },
  );
  return Car;
};
