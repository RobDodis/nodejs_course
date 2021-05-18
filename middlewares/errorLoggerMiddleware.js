const logger = require('../logger');
const context = require('./requestContextMiddleware').context;

module.exports = () => (err, req, res, next) => {
  const requestContext = Object.fromEntries(context.getStore().entries());
  logger.error({
    msg: err.message,
    status: err.status || 500,
    stack: err.stack,
    requestContext,
  });

  const message = err.status ? err.message : 'Something went wrong!';
  res.status(err.status || 500).send(message);
};
