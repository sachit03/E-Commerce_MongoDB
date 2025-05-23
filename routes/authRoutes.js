const express  = require('express');
const router   = express.Router();
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validation/auth');
const { register, login } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Sachit
 *   description: User authentication
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: Sachit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: Registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Registered
 *                 userId:
 *                   type: string
 */
router.post('/api/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: Sachit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Logged in
 *                 token:
 *                   type: string
 */
router.post('/api/login', validate(loginSchema), login);

module.exports = router;


