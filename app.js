const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');
const setupRoutes = require('./routes');

logger.log(`Environment: ${config.env}`);

const app = express();

app.use(bodyParser.json());

setupRoutes(app);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Somthing went wrong!');
});

app.listen(config.PORT, () => {
  logger.log(`Listening on port ${config.PORT}...`);
});
