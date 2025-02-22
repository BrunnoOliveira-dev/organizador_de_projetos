const Interacao = require('../models/interacaocomprojeto')
const comentariosdoprojeto = require('../models/comentariosdoprojeto')
const taskdoprojeto = require('../models/task')

//
const Projeto = require('../models/projetos')

async function setProjeto(req, res) {
    try {
        const novoProjeto = await Projeto.create(req.body)
        res.status(201).json(novoProjeto)
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar projeto.' });
    }
}
//

async function setInteracao(req, res) {
    try {
        const novoInteracao = await Interacao.create(req.body)
        res.status(201).json(novoInteracao)
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar Interacao.' });
        console.log(error)
    }
}

async function getAllInteracoes(req, res) {
    try {
        const Interacaos = await Interacao.findAll()
        res.status(200).json(Interacaos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Interacaos.' });
    }
}

async function getInteracaoById(req, res) {
    try {
        const { id } = req.params

        const Interacao = await Interacao.findByPk(id)

        if (Interacao) {
            res.status(200).json(Interacao)
        } else {
            res.status(404).json({ error: 'Interacao não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o Interacao.' });
    }
}


async function getAllInteracoesFromProjeto(res, res) {
    try {
        const {idProjeto} = req.params


        const interacao = await Comentario.findAll({
            where: { idProjeto }
        })


        if (comentarios.length > 0) {
            res.status(200).json(comentarios);
        } else {
            res.status(404).json({ error: 'Nenhum comentário encontrado para este projeto.' });
        }
    } catch {
        res.status(500).json({ error: 'Erro ao buscar o Comentario do projeto.' });
    }
}

async function getInteracaoComComentarioETask(params) {
    try {
        const {idProjeto} = req.params


        const interacao = await Comentario.findAll({
            where: { idProjeto },
            include: [
                {
                    model: comentariosdoprojeto,
                    as: 'comentarios',
                    required: false
                }, {
                    model: taskdoprojeto,
                    as: 'tasks',
                    required: false
                }
            ]
        })


        if (comentarios.length > 0) {
            res.status(200).json(comentarios);
        } else {
            res.status(404).json({ error: 'Nenhum comentário encontrado para este projeto.' });
        }
    } catch {
        res.status(500).json({ error: 'Erro ao buscar o Comentario do projeto.' });
    }
}

/* module.exports = {
    setInteracao,
    getAllInteracoes,
    getInteracaoById,
    getInteracaoComComentarioETask
} */