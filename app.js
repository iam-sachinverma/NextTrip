const express = require('express');
const morgan = require('morgan')

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// route
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Mount Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;