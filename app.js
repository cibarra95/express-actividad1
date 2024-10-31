require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

/** Middlewares */
app.use(logger('dev'));
app.use(express.json());

/** Routes */
const routes = require('./config/routes.config');
app.use('/api/employees', routes);

app.use((req, res, next) => {
  next(createError(404, 'Route not found'))
})


app.use((error, req, res, next) => {
  if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = require('./data/employees.json')
  data.message = error.message;

});

const port = process.env.PORT || 8000;



app.listen(port, () => {
  console.info(`Application running at port ${port}`)
});
