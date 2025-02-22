const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const task = sequelize.define('task', {
    idTask: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomeDaTask: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricaoDaTask: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    progressoDaTask: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idProjeto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projeto',
        key: 'idProjeto'
      }
    },
    dataDaTask: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'task',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTask" },
        ]
      },
      {
        name: "idInteracaoComProjeto",
        using: "BTREE",
        fields: [
          { name: "idInteracaoComProjeto" },
        ]
      },
    ]
  });

module.exports = task;
