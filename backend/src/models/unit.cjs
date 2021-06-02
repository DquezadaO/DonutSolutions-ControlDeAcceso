const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user, { onDelete: 'cascade' });
      this.hasMany(models.car, { onDelete: 'cascade' });
    }
  }
  Unit.init(
    {
      number: DataTypes.STRING,
      condominiumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'unit',
    },
  );
  return Unit;
};
