const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// route
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Mount Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
