const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authenticate');


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