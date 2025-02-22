const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const interacaoProjetoCategoria = sequelize.define('interacaoprojetocategoria', {
    idInteracaoComProjeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'interacaocomprojeto',
        key: 'idInteracaoComProjeto'
      }
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categoria',
        key: 'idCategoria'
      }
    }
  }, {
    sequelize,
    tableName: 'interacaoprojetocategoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInteracaoComProjeto" },
          { name: "idCategoria" },
        ]
      },
      {
        name: "idCategoria",
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
    ]
  });


module.exports = interacaoProjetoCategoria;