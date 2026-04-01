const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


/**
* @swagger
* tags:
*   name: Authentication
*   description: User registration, login, and profile management
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user and return a JWT token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged in successfully

 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully

 */
router.get('/me', authController.me);

/**
 * @swagger
 * /api/auth/profile:
 *   post:
 *     summary: Update the current user's profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User profile updated successfully

 */
router.post('/profile', authController.updateProfile);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', authController.logout);


module.exports = router;