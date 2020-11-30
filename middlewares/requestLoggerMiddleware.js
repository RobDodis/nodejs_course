const logger = require('../logger');
const context = require('./requestContextMiddleware').context;

module.exports = () => (req, res, next) => {
  const requestContext = Object.fromEntries(context.getStore().entries());

  logger.trace({
    msg: 'incoming request',
    url: req.url,
    body: req.body,
    requestContext,
  });
  next();
};
