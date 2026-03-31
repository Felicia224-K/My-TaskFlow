const { Project} = require('../models');

// create a project
const create = async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json(project);
};

//read all projects
const getAll = async (req, res) => {
    const projects = await Project.findAll();
    res.json(projects);
};


//update a project
const update = async (req, res) => {
    await Project.update(req.body, 
        { where: { id: req.params.id } });
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

module.exports = {
    create,
    getAll,
    update,
    getById,
    deleteProject
};

