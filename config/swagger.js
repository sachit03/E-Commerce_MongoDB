
const swaggerJSDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'MongoDB + Mongoose + Joi – fully documented with swagger-jsdoc'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 8000}` }
    ],
    components: {
      schemas: {
        UserRegister: {
          type: 'object',
          required: ['name','email','password'],
          properties: {
            name:     { type: 'string', example: 'Alice' },
            email:    { type: 'string', format: 'email', example: 'alice@example.com' },
            password: { type: 'string', example: '••••••' },
            role:     { type: 'string', enum: ['user','admin'], default: 'user' }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email','password'],
          properties: {
            email:    { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            _id:         { type: 'string' },
            name:        { type: 'string' },
            description: { type: 'string' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            name:      { type: 'string' },
            price:     { type: 'number' },
            stock:     { type: 'integer' },
            category:  { type: 'string' }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            productId: { type: 'string' },
            quantity:  { type: 'integer' }
          }
        },
        Address: {
          type: 'object',
          properties: {
            street:     { type: 'string' },
            city:       { type: 'string' },
            state:      { type: 'string' },
            postalCode: { type: 'string' },
            country:    { type: 'string' },
            type:       { type: 'string', enum: ['shipping','billing'] }
          }
        },
        Order: {
          type: 'object',
          properties: {
            items:            { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
            shippingAddress:  { type: 'string' },
            billingAddress:   { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']  
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = { swaggerUi, swaggerSpec };

