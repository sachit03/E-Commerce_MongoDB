// routes/addressRoutes.js
const express  = require('express');
const router   = express.Router();
const jwt      = require('../middleware/jwt');
const validate = require('../middleware/validate');
const { addressSchema } = require('../validation/address');
const {
  addAddress,
  updateAddress,
  getUserAddresses,
  deleteAddress
} = require('../controllers/addressController');

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Manage user addresses
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Add a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added
 */
router.post('/api/address', jwt, validate(addressSchema), addAddress);

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: List user addresses
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get('/api/address', jwt, getUserAddresses);

/**
 * @swagger
 * /api/address/{id}:
 *   patch:
 *     summary: Update an address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated
 */
router.patch('/api/address/:id', jwt, validate(addressSchema), updateAddress);

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Address]
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
 *         description: Address deleted
 */
router.delete('/api/address/:id', jwt, deleteAddress);

module.exports = router;

