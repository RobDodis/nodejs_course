const { CLIENT_RENEG_LIMIT } = require('tls');
const fib = require('../fibonacci');

process.on('message', (message) => {
  console.log(message);
  process.send({ message: fib(message) });
});
