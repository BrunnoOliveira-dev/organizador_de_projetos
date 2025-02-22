const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')



// projeto

router.post('/projeto', controller.projeto.setProjeto)

router.get('/projeto', controller.projeto.getAllProjetos)

router.get('/projeto/:id', controller.projeto.getProjetoById)

router.put('/projeto/:id', controller.projeto.updateProjeto)

router.delete("/projeto/:id", controller.projeto.deletarProjeto)

// interacao

// router.post('/interacao', controller.interacao.setInteracao)

// router.get('/interacao', controller.interacao.getAllInteracoes)

// router.get('/interacao/:id', controller.interacao.getInteracaoComComentarioETask)

// comentario

router.post('/comentario', controller.comentario.setComentario)

router.get('/comentario', controller.comentario.getAllComentarios)

router.get('/comentario/:id', controller.comentario.getComentarioById)

router.get('/comentario/projeto/:id', controller.comentario.getComentarioByIdProjeto)

router.delete('/comentario/:id', controller.comentario.deletarComentario)

// task

router.post('/task', controller.task.setTask)

router.get('/task', controller.task.getAllTasks)

router.get('/task/:id', controller.task.getTaskById)

router.get('/task/projeto/:id', controller.task.getTaskByIdProjeto)

router.delete('/task/:id', controller.task.deletarTask)

router.put('/task/:id', controller.task.updateTask)


// rotas do controller

// router.get('/users', controller.getAllUsers)


module.exports = router;