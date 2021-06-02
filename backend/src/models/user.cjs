const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.visit, { foreignKey: 'residentId', onDelete: 'cascade' });
      this.belongsTo(models.unit);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      unitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
      paranoid: true,
      hooks: {
        afterDestroy: (user, options) => {
          user.getVisits().then((visits) => visits.forEach((visit) => visit.destroy()));
        },
      },
    },
  );
  return User;
};
