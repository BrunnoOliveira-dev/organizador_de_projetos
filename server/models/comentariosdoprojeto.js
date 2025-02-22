const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const comentarios = sequelize.define('comentariosdoprojeto', {
    idComentario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comentario: {
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
    dataComentario: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comentariosdoprojeto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idComentario" },
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


module.exports = comentarios;