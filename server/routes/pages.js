const express = require('express');
const router = express.Router();

// Exemplo de rota de página
router.get("/", (req, res) => {
  res.render('listarProjetos', { title: 'Página Inicial' })
})

router.get("/cadastroDeProjeto", (req, res) => {
  res.render('cadastroProjeto', { title: 'Página de cadastro de Projetos' })
})

router.get("/projeto/:id", (req, res) => {
  res.render('paginaProjeto', { title: 'Página do Projeto' })
})

router.get('/editar-projeto/:id', (req, res) => {
  res.render('edicaoDoProjeto', { title: 'Página de edição do Projeto' })
})



module.exports = router;