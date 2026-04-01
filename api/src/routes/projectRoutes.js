const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticate = require('../middlewares/authenticate');
const task = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     responses:
 *       201:
 *         description: Project created successfully

 */
router.post('/', authenticate, projectController.create);


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects for the current user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/', authenticate,projectController.getAll);


/**
 * @swagger
 * /api/projects/search:
 *   get:
 *     summary: Search projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/search', authenticate, projectController.search);



/**
 * @swagger
 * /api/projects/filter-by-date:
 *   get:
 *     summary: Filter projects by date
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects filtered successfully
 */
router.get('/filter-by-date',  authenticate, projectController.filterByDate);



/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Project retrieved successfully

 */
router.get('/:id', authenticate, projectController.getOne);








/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 */
router.put('/:id', authenticate, projectController.update);




/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete('/:id', authenticate, projectController .deleteProject);



/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/:id/tasks', authenticate, projectController.getProjectTasks);



/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   post:
 *     summary: Create a new task for a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/:id/tasks', authenticate, task.create);







module.exports = router;