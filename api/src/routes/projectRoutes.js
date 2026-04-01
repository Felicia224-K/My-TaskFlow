const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
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
router.post('/', projectController.create);


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
router.get('/', projectController.getAll);


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
router.get('/search', projectController.search);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project retrieved successfully

 */
router.get('/:id/tasks', projectController.getProjectTasks);


/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 */
router.get('/:id', projectController.getOne);


/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put('/:id', projectController.update);



/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 */
router.get('/:id', projectController.getById);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete('/:id', projectController .deleteProject);



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
router.get('/filter-by-date', projectController.filterByDate);


module.exports = router;