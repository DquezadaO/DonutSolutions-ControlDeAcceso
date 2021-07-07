const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.unit);
      this.belongsTo(models.visit);
    }
  }
  Entry.init(
    {
      unitId: DataTypes.INTEGER,
      visitId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      manual: DataTypes.BOOLEAN,
      entryTimestamp: DataTypes.DATE,
      licensePlate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'entry',
      paranoid: true,
    },
  );
  return Entry;
};
