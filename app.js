const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');
require('./services/storage');
const requestContextMiddleware = require('./middlewares/requestContextMiddleware');
const requestLoggerMiddleware = require('./middlewares/requestLoggerMiddleware');
const errorLoggerMiddleware = require('./middlewares/errorLoggerMiddleware');
const setupRoutes = require('./routes');

logger.log(`Environment: ${config.NODE_ENV}`);

const app = express();

app.use(bodyParser.json());

app.use(requestContextMiddleware());

app.use(requestLoggerMiddleware());

setupRoutes(app, requestContextMiddleware.context);

app.use(errorLoggerMiddleware());

app.listen(config.PORT, () => {
  logger.log(`Listening on port ${config.PORT}...`);
});
