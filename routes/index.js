module.exports = (app) => {
  app.use(require('./events'));

  app.all('*', (req, res) => {
    res.type('json');
    res.send(JSON.stringify({ message: 'Hello world!' }));
  });
};
