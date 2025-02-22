const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const interacao = sequelize.define('interacaocomprojeto', {
    idInteracaoComProjeto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProjeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projetos',
        key: 'idProjeto'
      }
    },
    dataDaInteracao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'interacaocomprojeto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInteracaoComProjeto" },
        ]
      },
      {
        name: "idProjeto",
        using: "BTREE",
        fields: [
          { name: "idProjeto" },
        ]
      },
    ]
  });


module.exports = interacao;
