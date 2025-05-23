require('dotenv').config();
require('./config/database');

const express    = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const authRoutes     = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes  = require('./routes/productRoutes');
const publicRoutes   = require('./routes/publicRoutes');
const cartRoutes     = require('./routes/cartRoutes');
const addressRoutes  = require('./routes/addressRoutes');
const orderRoutes    = require('./routes/orderRoutes');
const webhookHandler = require('./controllers/webhookController').handleStripeWebhook;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);
app.use(authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);
app.use('/api',            publicRoutes);
app.use('/api/cart',       cartRoutes);
app.use('/api/address',    addressRoutes);
app.use('/api/order',      orderRoutes);
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

