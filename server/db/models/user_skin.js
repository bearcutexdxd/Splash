const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Skin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Skin.init({
    user_id: DataTypes.INTEGER,
    skin_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User_Skin',
  });
  return User_Skin;
};
