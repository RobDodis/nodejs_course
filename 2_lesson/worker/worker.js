const { parentPort } = require('worker_threads');
const fib = require('../fibonacci');

parentPort.postMessage(fib(30));
