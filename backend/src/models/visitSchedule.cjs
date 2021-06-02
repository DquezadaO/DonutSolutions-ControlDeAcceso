const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VisitSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.visit);
    }
  }
  VisitSchedule.init(
    {
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      visitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'visitSchedule',
      paranoid: true,
    },
  );
  return VisitSchedule;
};
