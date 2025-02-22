const { where } = require('sequelize');
const Projeto = require('../models/projetos')
const Comentario = require('../models/comentariosdoprojeto')
const Task = require('../models/task')


async function setProjeto(req, res) {
    try {
        const novoProjeto = await Projeto.create(req.body)
        res.status(201).json(novoProjeto)
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar projeto.' });
    }
}

async function getAllProjetos(req, res) {
    try {
        const projetos = await Projeto.findAll()
        res.status(200).json(projetos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar projetos.' });
    }
}

async function getProjetoById(req, res) {
    try {
        const { id } = req.params

        const projeto = await Projeto.findByPk(id)

        if (projeto) {
            res.status(200).json(projeto)
        } else {
            res.status(404).json({ error: 'Projeto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o projeto.' });
    }
}

async function updateProjeto(req, res) {
    try {
        const { id } = req.params;

        const projetoAtualizado = await Projeto.update(req.body, {
            where: { idProjeto: id },
            returning: true, // Retorna o projeto atualizado
        });

        if (projetoAtualizado[0] === 0) {
            res.status(404).json({ error: 'Projeto não encontrado ou não houve alterações.' });
        } else {
            const projeto = projetoAtualizado[1][0]; // O projeto atualizado está na segunda posição do array
            res.status(200).json(projeto);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o projeto.' });
    }
}

async function deletarProjeto(req, res) {
    try {
        const { id } = req.params;

        await Comentario.destroy({
            where: { idProjeto: id }
        });

        // Deletar tasks relacionadas ao projeto
        await Task.destroy({
            where: { idProjeto: id }
        });

        const projetoDeletado = await Projeto.destroy({
            where: { idProjeto: id }
        });

        if (projetoDeletado) {
            // Se o projeto foi deletado, envia uma resposta de sucesso
            res.status(200).json({ message: 'Projeto deletado com sucesso.' });
        } else {
            // Se não encontrar o projeto para deletar, envia uma resposta de erro
            res.status(404).json({ error: 'Projeto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar projeto.' });
    }
}


module.exports = {
    setProjeto,
    getAllProjetos,
    getProjetoById,
    updateProjeto,
    deletarProjeto
}