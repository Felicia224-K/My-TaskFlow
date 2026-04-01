const express = require('express');
const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API health check endpoint
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'API is healthy',
        uptime: process.uptime(),
        timestamp: Date.now()
     });
});
module.exports = router;