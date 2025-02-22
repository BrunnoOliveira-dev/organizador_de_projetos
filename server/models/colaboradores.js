const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const colaboradores = sequelize.define('colaboradores', {
    idColaborador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProjeto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projetos',
        key: 'idProjeto'
      }
    },
    nomeDoParticipante: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'colaboradores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idColaborador" },
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

module.exports = colaboradores;