const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize.DataTypes;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("gender", {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  });
};
