const { Project, Task } = require('../models');
const { Op } = require('sequelize');
const redis = require('../config/redis');

// create a project
const create = async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json(project);
};


const getOne = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [Task]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//read all projects
const getAll = async (req, res) => {
    try {
        const cachekey = `projects:${req.user.id}`;

        const cached = await redis.get(cachekey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const projects = await Project.findAll({
            where: { userId: req.user.id },
        });


        await redis.set(cachekey, JSON.stringify(projects), 'EX', 3600); // Cache for 1 hour

        res.json(projects);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getProjectTasks = async (req, res) => {
    try {
        const projectId = req.params.id;
        const cachekey = `tasks:${projectId}`;

        const cached = await redis.get(cachekey);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const tasks = await Task.findAll({ 
            where: { projectId }
         });

        await redis.set(cachekey, JSON.stringify(tasks), 'EX', 3600); // Cache for 1 hour
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update a project
const update = async (req, res) => {
    await Project.update(req.body, 
        { where: { id: req.params.id } });
    await redis.del('projects'); // Clear the cache
    res.json({ message: 'Project updated' });

};

//get a project by id
const getById = async (req, res) => {
    const project = await Project.findByPk(req.params.id);
    res.json(project);
};

//delete a project
const deleteProject = async (req, res) => {
     await Project.destroy({ 
        where: { id: req.params.id } });

    res.json({ message: 'Project deleted' });
};




const search = async (req, res) => {
    try {
        const { q } = req.query;

        const projects = await Project.findAll({
            where: {
                title: {
                [Op.iLike]: `%${q}%`
                }
            }
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const filterByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const projects = await Project.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    create,
    getOne,
    getAll,
    getProjectTasks,
    update,
    getById,
    deleteProject,
    search,
    filterByDate
};

