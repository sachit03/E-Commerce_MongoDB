# E-Commerce Backend (MongoDB + Mongoose + Joi + Swagger)

A simple, fully-featured e-commerce backend API built with Node.js, Express, MongoDB (via Mongoose), request validation with Joi, and interactive API documentation using Swagger UI.

## Features

* User registration & login (JWT authentication)
* Role-based authorization (admin vs. user)
* Category & product CRUD (admin)
* Public product & category listing (user)
* Shopping cart management
* Address management (shipping/billing)
* Order creation with Stripe payment intent
* Webhook to confirm payments
* Request validation with Joi
* Interactive Swagger documentation

## Prerequisites

* Node.js v14+ and npm
* MongoDB (local or Atlas)
* Stripe account for payment intent

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/E-Commerce_MongoDB.git
   cd E-Commerce_MongoDB
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the project root, based on `.env.example`:

   ```dotenv
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/ecomdb
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```

## Running

* API server: `http://localhost:8000`
* Swagger UI docs: `http://localhost:8000/api-docs`

## Project Structure

```
├── app.js                 # Main application entry
├── config/
│   ├── database.js        # MongoDB connection
│   ├── stripe.js          # Stripe config
│   └── swagger.js         # Swagger-jsdoc setup
├── controllers/           # Request handlers
├── middleware/            # JWT, authorization, validation
├── models/                # Mongoose schemas
├── routes/                # Express routes
├── validation/            # Joi schemas
├── swagger-output.json    # Generated OpenAPI spec
├── .env.example           # Example environment variables
└── package.json           # Dependencies & scripts
```

## Scripts

* `npm run dev` — regenerate docs & start server with nodemon
* `npm start` — start server without auto-regeneration

## API Documentation

Browse and test all API endpoints via Swagger UI:

```
http://localhost:8000/api-docs
```

Happy coding!
