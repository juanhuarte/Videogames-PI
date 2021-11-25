//const { DataTypes } = require('sequelize');
const Sequelize = require("sequelize");
const { UUID, STRING, TEXT, ARRAY, INTEGER } = Sequelize.DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: TEXT,
      allowNull: false,
    },
    realiseDate: {
      type: STRING, // con string se que va a funcionar tmb podria ser DATEONLY
      allowNull: false,
    },
    rating: {
      type: STRING, // como el rating puede tener un numero con coma uso un string aunque hay un dataype DECIMAL
      allowNull: false,
    },
    platforms: {
      type: ARRAY(TEXT),
      allowNull: false,
    },
    background_img: {
      type: STRING,
    },
  });

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
