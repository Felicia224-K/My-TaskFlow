const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authenticate');


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User dashboard with project and task summaries
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get the current user's dashboard
 *     tags: [Dashboard]
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProjects:
 *                   type: number
 *                   example: 5
 *                 totalTasks:
 *                   type: number
 *                   example: 20
 *                 completedTasks:
 *                   type: number
 *                   example: 10
 *                 pendingTasks:
 *                   type: number
 *                   example: 10
 */
router.get('/', authenticate, dashboard.getDashboard);


module.exports = router;