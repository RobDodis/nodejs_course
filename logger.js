const logger = require('pino')();

module.exports = {
  log(...args) {
    console.info(...args);
  },
  info(...args) {
    logger.info(...args);
  },
  trace(...args) {
    logger.trace(...args);
  },
  warn(...args) {
    logger.warn(...args);
  },
  debug(...args) {
    logger.debug(...args);
  },
  error(...args) {
    logger.error(...args);
  },
};
