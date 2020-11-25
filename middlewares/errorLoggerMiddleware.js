const logger = require('../logger');
const context = require('./requestContextMiddleware').context;

module.exports = () => (err, req, res, next) => {
  const requestContext = Object.fromEntries(context.getStore().entries());
  logger.error({
    msg: err.message,
    stack: err.stack,
    requestContext,
  });
  res.status(500).send('Something went wrong!');
};
