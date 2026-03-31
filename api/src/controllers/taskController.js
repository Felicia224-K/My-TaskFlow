const { Task } = require('../models');

// create a task
exports.create = async (req, res) => {
    try {
        const task = await Task.create({
             ...req.body, userId: req.user.id
             });

        res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ error: err.message });
    }
};

//read all tasks
exports.getAll = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const tasks = await Task.findAll({ where: filter });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update a task
exports.update = async (req, res) => {
    try {
        await Task.update(req.body, 
            { where: { id: req.params.id } });
        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get a task by id
exports.getById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//delete a task
exports.delete = async (req, res) => {
    try {
         await Task.destroy({ 
            where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
