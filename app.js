const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');
const requestContextMiddleware = require('./middlewares/requestContextMiddleware');
const setupRoutes = require('./routes');

logger.log(`Environment: ${config.env}`);

const app = express();

app.use(bodyParser.json());

app.use(requestContextMiddleware());

app.use((req, res, next) => {
  const context = Object.fromEntries(requestContextMiddleware.context.getStore().entries());
  logger.trace({
    msg: 'incoming request',
    url: req.url,
    body: req.body,
    ...context,
  });
  next();
});

setupRoutes(app, requestContextMiddleware.context);

app.use((err, req, res, next) => {
  const context = Object.fromEntries(requestContextMiddleware.context.getStore().entries());
  logger.error({
    msg: err.message,
    stack: err.stack,
    ...context,
  });

  res.status(500).send('Somthing went wrong!');
});

app.listen(config.PORT, () => {
  logger.log(`Listening on port ${config.PORT}...`);
});
