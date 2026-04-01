const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');
const { body, param } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');



/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, task.getAll);


/**
 * @swagger 
 * /api/tasks/search:
 *   get:
 *     summary: Search tasks by status and priority
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *        200:
 *         description: Tasks retrieved successfully
 *        401:
 *          description: Unauthorized
 */
router.get('/me', authenticate, task.getMyTasks);

/**
 * @swagger
 * /api/tasks/filter-by-date:
 *   get:
 *     summary: Filter tasks by date
 *     tags: [Tasks]
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
 *         description: Tasks retrieved successfully
 *       401:
 *          description: Unauthorized
 */
router.get('/filter-by-date', authenticate, task.filterByDate);

/**
 * @swagger
 * /api/tasks/stats:
 *   get:
 *     summary: Get task statistics
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/stats', authenticate, task.getStats);


/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
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
 *        201:
 *          description: Task created successfully
 *        401: 
 *          description: Unauthorized
 */
router.post('/', authenticate, 
    [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['pending', 'in_progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    
    ],
    validate,
    task.create
);



/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
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
 *         description: Task retrieved successfully
 *       401:
 *          description: Unauthorized
 */
router.get('/:id', authenticate,
    [
        param('id').isUUID().withMessage('Invalid task ID'),
        
    ],
    validate,
    task.getById);


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
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
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate,
    [
        body('title').optional().notEmpty(),
        body('status').optional().isIn(['pending', 'in_progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    task.update);



/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update a task's status
 *     tags: [Tasks]
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *     responses:
 *        200:
 *          description: Task status updated successfully
 */
router.patch('/:id', authenticate,
    [
        body('title').optional().notEmpty(),
        body('status').optional().isIn(['pending', 'in_progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    task.patch
);



/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *      summary: Update a task's status
 *      tags: [Tasks]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *      responses:
 *        200:
 *          description: Task status updated successfully
 *        401: Unauthorized
 */
router.patch('/:id/status', authenticate,
    [
        body('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Invalide status value'),
        
    ],
    validate,
    task.updateStatus);



/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate,
    [
        param('id').isUUID().withMessage('Invalid task ID'),
    ],
    validate,
    task.delete
);


module.exports = router;