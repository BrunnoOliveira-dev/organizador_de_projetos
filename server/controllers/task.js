const { where } = require('sequelize');
const Task = require('../models/task')

async function setTask(req, res) {
    try {

        const novaTask = await Task.create(req.body);
        console.log('Task criada com sucesso:', novaTask);

        res.status(201).json(novaTask);
    } catch (error) {
        console.error('Erro ao criar Task:', error);
        res.status(400).json({ error: 'Erro ao criar Task.' });
    }
}

async function getAllTasks(req, res) {
    try {
        console.log('Iniciando a busca de todos as Tasks.');

        const Tasks = await Task.findAll();
        console.log('Tasks encontrados:', Tasks);

        res.status(200).json(Tasks);
    } catch (error) {
        console.error('Erro ao buscar Tasks:', error);
        res.status(500).json({ error: 'Erro ao buscar Tasks.' });
    }
}

async function getTaskById(req, res) {
    try {
        console.log('Iniciando a busca de Task por ID.');

        const { id } = req.params;
        console.log(`ID recebido: ${id}`);

        const TaskEncontrado = await Task.findByPk(id);
        console.log('Resultado da consulta:', TaskEncontrado);

        if (TaskEncontrado) {
            res.status(200).json(TaskEncontrado);
        } else {
            console.log('Task não encontrado.');
            res.status(404).json({ error: 'Task não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar o Task:', error);
        res.status(500).json({ error: 'Erro ao buscar o Task.' });
    }
}

async function getTaskByIdProjeto(req, res) {
    try {
        console.log('Iniciando a busca de Tasks por ID do projeto.');

        const { id } = req.params;
        console.log(`ID do projeto recebido: ${id}`);

        const comentarios = await Task.findAll({
            where: { idProjeto: id }
        });

        console.log('Resultado da consulta:', comentarios);

        if (comentarios.length > 0) {
            res.status(200).json(comentarios);
        } else {
            console.log('Nenhum Task encontrado para este projeto.');
            res.status(404).json({ error: 'Nenhum Task encontrado para este projeto.' });
        }
    } catch (error) {
        console.error('Erro ao buscar os Tasks do projeto:', error);
        res.status(500).json({ error: 'Erro ao buscar os Tasks do projeto.' });
    }
}

async function deletarTask(req, res) {
    try {
        const { id } = req.params;

        const taskDeletada = await Task.destroy({
            where: { idTask: id }
        });

        if (taskDeletada) {
            // Se o comentario foi deletado, envia uma resposta de sucesso
            res.status(200).json({ message: 'Task deletado com sucesso.' });
        } else {
            // Se não encontrar o comentario para deletar, envia uma resposta de erro
            res.status(404).json({ error: 'Task não encontrado.' });
        }
    } catch (err) {
        console.error("Erro ao deletar comentario")
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;

        console.log(id)

        const taskAtualizada = await Task.update(req.body, {
            where: { idTask: id },
            returning: true, // Retorna o projeto atualizado
        });

        console.log(taskAtualizada)

        if (taskAtualizada[0] === 0) {
            res.status(404).json({ error: 'Task não encontrado ou não houve alterações.' });
        } else {
            const task = taskAtualizada[1][0]; // O projeto atualizado está na segunda posição do array
            res.status(200).json(task);
            
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a task.' });
    }
}

module.exports = {
    setTask,
    getAllTasks,
    getTaskById,
    getTaskByIdProjeto,
    deletarTask,
    updateTask
}
