const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid');

const context = new AsyncLocalStorage();

module.exports = () => (req, res, next) => {
  context.run(new Map(), () => {
    const store = context.getStore();
    store.set('requestId', uuidv4());
    store.set('userId', uuidv4());
    next();
  });
};

module.exports.context = context;
