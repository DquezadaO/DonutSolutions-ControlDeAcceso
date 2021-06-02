'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'backofficeId', as: 'backoffice' });
    }
  }
  Provider.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      run: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: DataTypes.STRING,
      licensePlate: DataTypes.STRING,
      backofficeId: DataTypes.INTEGER,
      condominiumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'provider',
    },
  );
  return Provider;
};
