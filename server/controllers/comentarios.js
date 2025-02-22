const { where } = require('sequelize');
const Comentario = require('../models/comentariosdoprojeto')

async function setComentario(req, res) {
    try {
        console.log('Iniciando a criação de um novo comentário.');
        console.log('Dados recebidos:', req.body);

        const novoComentario = await Comentario.create(req.body);
        console.log('Comentário criado com sucesso:', novoComentario);

        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao criar Comentario:', error);
        res.status(400).json({ error: 'Erro ao criar Comentario.' });
    }
}

async function getAllComentarios(req, res) {
    try {
        console.log('Iniciando a busca de todos os comentários.');

        const Comentarios = await Comentario.findAll();
        console.log('Comentários encontrados:', Comentarios);

        res.status(200).json(Comentarios);
    } catch (error) {
        console.error('Erro ao buscar Comentarios:', error);
        res.status(500).json({ error: 'Erro ao buscar Comentarios.' });
    }
}

async function getComentarioById(req, res) {
    try {
        console.log('Iniciando a busca de comentário por ID.');

        const { id } = req.params;
        console.log(`ID recebido: ${id}`);

        const ComentarioEncontrado = await Comentario.findByPk(id);
        console.log('Resultado da consulta:', ComentarioEncontrado);

        if (ComentarioEncontrado) {
            res.status(200).json(ComentarioEncontrado);
        } else {
            console.log('Comentário não encontrado.');
            res.status(404).json({ error: 'Comentario não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar o Comentario:', error);
        res.status(500).json({ error: 'Erro ao buscar o Comentario.' });
    }
}

async function getComentarioByIdProjeto(req, res) {
    try {
        console.log('Iniciando a busca de comentários por ID do projeto.');

        const { id } = req.params;
        console.log(`ID do projeto recebido: ${id}`);

        const comentarios = await Comentario.findAll({
            where: { idProjeto: id }
        });

        console.log('Resultado da consulta:', comentarios);

        if (comentarios.length > 0) {
            res.status(200).json(comentarios);
        } else {
            console.log('Nenhum comentário encontrado para este projeto.');
            res.status(404).json({ error: 'Nenhum comentário encontrado para este projeto.' });
        }
    } catch (error) {
        console.error('Erro ao buscar os comentários do projeto:', error);
        res.status(500).json({ error: 'Erro ao buscar os comentários do projeto.' });
    }
}

async function deletarComentario(req, res) {
    try {
        const { id } = req.params;

        const comentarioDeletado = await Comentario.destroy({
            where: { idComentario: id }
        });

        if (comentarioDeletado) {
            // Se o comentario foi deletado, envia uma resposta de sucesso
            res.status(200).json({ message: 'Comentario deletado com sucesso.' });
        } else {
            // Se não encontrar o comentario para deletar, envia uma resposta de erro
            res.status(404).json({ error: 'Comentario não encontrado.' });
        }
    } catch (err) {
        console.error("Erro ao deletar comentario")
    }
}

module.exports = {
    setComentario,
    getAllComentarios,
    getComentarioById,
    getComentarioByIdProjeto,
    deletarComentario
}
