// routes/orderRoutes.js
// routes/orderRoutes.js
const express  = require('express');
const router   = express.Router();
const jwt      = require('../middleware/jwt');
const validate = require('../middleware/validate');
const { orderSchema } = require('../validation/order');
const {
  createOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder
} = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order processing and payment
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create an order (initiates Stripe payment)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order pending payment
 */
router.post('/api/order', jwt, validate(orderSchema), createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List user orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/api/orders', jwt, getUserOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Order]
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
 *         description: Order object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/api/order/:id', jwt, getOrderDetails);

/**
 * @swagger
 * /api/order/{id}/cancel:
 *   patch:
 *     summary: Cancel a pending order
 *     tags: [Order]
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
 *         description: Order cancelled
 */
router.patch('/api/order/:id/cancel', jwt, cancelOrder);

module.exports = router;
