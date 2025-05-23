
const express  = require('express');
const router   = express.Router();
const jwt      = require('../middleware/jwt');
const {
  getAllCategoryForUser,
  getAllProductsForUser,
  getProductDetailsForUser
} = require('../controllers/publicController');

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Customer-facing listing
 */

/**
 * @swagger
 * /api/user/categories:
 *   get:
 *     summary: List categories for users
 *     tags: [Public]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/api/user/categories', jwt, getAllCategoryForUser);

/**
 * @swagger
 * /api/user/products:
 *   get:
 *     summary: List products for users
 *     tags: [Public]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/api/user/products', jwt, getAllProductsForUser);

/**
 * @swagger
 * /api/user/product/{id}:
 *   get:
 *     summary: Get product details for users
 *     tags: [Public]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/api/user/product/:id', jwt, getProductDetailsForUser);

module.exports = router;

