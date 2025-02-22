const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const categoria = sequelize.define('categoria', {
    idCategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomeDaCategoria: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "nomeDaCategoria"
    }
  }, {
    sequelize,
    tableName: 'categoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
      {
        name: "nomeDaCategoria",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nomeDaCategoria" },
        ]
      },
    ]
  });


module.exports = categoria;