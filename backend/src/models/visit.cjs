const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.visitSchedule, { onDelete: 'cascade' });
      this.belongsTo(models.user, { foreignKey: 'residentId', as: 'resident' });
    }
  }
  Visit.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      run: DataTypes.STRING,
      phone: DataTypes.STRING,
      licensePlate: DataTypes.STRING,
      residentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'visit',
      paranoid: true,
      hooks: {
        afterDestroy: (visit, options) => {
          visit.getVisitSchedule().then((visitSchedule) => visitSchedule.destroy());
        },
      },
    },
  );
  return Visit;
};
