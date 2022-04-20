import { Model } from 'sequelize-typescript'

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Record.init({
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};