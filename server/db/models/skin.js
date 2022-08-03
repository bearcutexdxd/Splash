const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsToMany(User, {
        through: 'User_Skins',
        foreignKey: 'skin_id',
      });
    }
  }
  Skin.init({
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    descr: DataTypes.TEXT,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Skin',
  });
  return Skin;
};
