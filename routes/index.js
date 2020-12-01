module.exports = (app, context) => {
  app.use(require('./events'));
  app.use(require('./users'));
  app.use(require('./auth'));

  app.all('*', (req, res) => {
    res.type('json');
    const requestId = context.getStore().get('requestId');
    res.send(JSON.stringify({ message: 'Hello world!', requestId }));
  });
};
