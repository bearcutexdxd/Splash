const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Statistics, Skin }) {
      this.belongsToMany(Skin, {
        through: 'User_Skins',
        foreignKey: 'user_id',
      });
      this.hasOne(Statistics, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    current_skin: DataTypes.TEXT,
    balance: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
