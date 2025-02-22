const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Projeto = sequelize.define('projetos', {
    idProjeto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tituloProjeto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    linkDoModeloConceitual: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    linkDoModeloLogico: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dataDoProjeto: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    linkDoGithub: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descricaoDoProjeto: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'projetos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProjeto" },
        ]
      },
    ]
  });

module.exports = Projeto