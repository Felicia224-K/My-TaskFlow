const { Task } = require('../models');
const { Op } = require('sequelize');
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

exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.patch = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.update(req.body);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id); 
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.update({ status: req.body.status });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.search = async (req, res) => {
    try {
        const { status, priority } = req.query;
        let filter = { userId: req.user.id };

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        const tasks = await Task.findAll({ where: filter });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//read all tasks
exports.getAll = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filter = { userId: req.user.id };

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
        const [updated] = await Task.update(req.body, 
            { where: { id: req.params.id } });

        if (!updated) {
            return res.status(404).json({ message: 'Task not found' });
        }
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
         const deleted =await Task.destroy({ 
            where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.filterByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const tasks = await Task.findAll({
            where: {
                userId: req.user.id,
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const total = await Task.count({ where: { userId: req.user.id } });
        const pending = await Task.count({ where: { userId: req.user.id, status: 'pending' } });
        const inProgress = await Task.count({ where: {userId: req.user.id, status: 'in_progress'  } }); 
        const completed = await Task.count({ where: {  userId: req.user.id, status: 'completed'} });
        res.json({ total, pending, inProgress, completed });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
};