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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized  
 */
router.post('/', authenticate, projectController.create);


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects for the current user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/', authenticate,projectController.getAll);


/**
 * @swagger
 * /api/projects/search:
 *   get:
 *     summary: Search projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/search', authenticate, projectController.search);



/**
 * @swagger
 * /api/projects/filter-by-date:
 *   get:
 *     summary: Filter projects by date
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Projects filtered successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/filter-by-date',  authenticate, projectController.filterByDate);



/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/:id', authenticate, projectController.getOne);








/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.put('/:id', authenticate, projectController.update);




/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.delete('/:id', authenticate, projectController .deleteProject);



/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/:id/tasks', authenticate, projectController.getProjectTasks);



/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   post:
 *     summary: Create a new task for a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/:id/tasks', authenticate, task.create);







module.exports = router;