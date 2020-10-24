const http = require('http');
const config = require('./config');
const logger = require('./logger');

logger.log(`Environment: ${config.env}`);

http
  .createServer((_, res) => {
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello world!' }));
  })
  .listen(config.PORT, () => {
    logger.log(`Listening on port ${config.PORT}...`);
  });
