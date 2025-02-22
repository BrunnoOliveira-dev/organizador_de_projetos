var DataTypes = require("sequelize").DataTypes;
var _categoria = require("./categoria");
var _colaboradores = require("./colaboradores");
var _comentariosdoprojeto = require("./comentariosdoprojeto");
var _interacaocomprojeto = require("./interacaocomprojeto");
var _interacaoprojetocategoria = require("./interacaoprojetocategoria");
var _projetos = require("./projetos");
var _task = require("./task");

function initModels(sequelize) {
  var categoria = _categoria(sequelize, DataTypes);
  var colaboradores = _colaboradores(sequelize, DataTypes);
  var comentariosdoprojeto = _comentariosdoprojeto(sequelize, DataTypes);
  var interacaocomprojeto = _interacaocomprojeto(sequelize, DataTypes);
  var interacaoprojetocategoria = _interacaoprojetocategoria(sequelize, DataTypes);
  var projetos = _projetos(sequelize, DataTypes);
  var task = _task(sequelize, DataTypes);

  categoria.belongsToMany(interacaocomprojeto, { as: 'idInteracaoComProjeto_interacaocomprojetos', through: interacaoprojetocategoria, foreignKey: "idCategoria", otherKey: "idInteracaoComProjeto" });
  interacaocomprojeto.belongsToMany(categoria, { as: 'idCategoria_categoria', through: interacaoprojetocategoria, foreignKey: "idInteracaoComProjeto", otherKey: "idCategoria" });
  interacaoprojetocategoria.belongsTo(categoria, { as: "idCategoria_categorium", foreignKey: "idCategoria"});
  categoria.hasMany(interacaoprojetocategoria, { as: "interacaoprojetocategoria", foreignKey: "idCategoria"});
  comentariosdoprojeto.belongsTo(interacaocomprojeto, { as: "idInteracaoComProjeto_interacaocomprojeto", foreignKey: "idInteracaoComProjeto"});
  interacaocomprojeto.hasMany(comentariosdoprojeto, { as: "comentariosdoprojetos", foreignKey: "idInteracaoComProjeto"});
  interacaoprojetocategoria.belongsTo(interacaocomprojeto, { as: "idInteracaoComProjeto_interacaocomprojeto", foreignKey: "idInteracaoComProjeto"});
  interacaocomprojeto.hasMany(interacaoprojetocategoria, { as: "interacaoprojetocategoria", foreignKey: "idInteracaoComProjeto"});
  task.belongsTo(interacaocomprojeto, { as: "idInteracaoComProjeto_interacaocomprojeto", foreignKey: "idInteracaoComProjeto"});
  interacaocomprojeto.hasMany(task, { as: "tasks", foreignKey: "idInteracaoComProjeto"});
  colaboradores.belongsTo(projetos, { as: "idProjeto_projeto", foreignKey: "idProjeto"});
  projetos.hasMany(colaboradores, { as: "colaboradores", foreignKey: "idProjeto"});
  interacaocomprojeto.belongsTo(projetos, { as: "idProjeto_projeto", foreignKey: "idProjeto"});
  projetos.hasMany(interacaocomprojeto, { as: "interacaocomprojetos", foreignKey: "idProjeto"});

  return {
    categoria,
    colaboradores,
    comentariosdoprojeto,
    interacaocomprojeto,
    interacaoprojetocategoria,
    projetos,
    task,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
