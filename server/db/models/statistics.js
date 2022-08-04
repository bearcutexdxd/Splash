const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Statistics.init({
    kills: DataTypes.INTEGER,
    deaths: DataTypes.INTEGER,
    loses: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    timePlayed: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Statistics',
  });
  return Statistics;
};
