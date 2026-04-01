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
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/', authenticate, dashboard.getDashboard);


module.exports = router;