const { Worker } = require('worker_threads');
const http = require('http');

http
  .createServer((_, res) => {
    const start = Date.now();
    console.log(`receive request: ${start}`);
    const worker = new Worker(`${__dirname}/worker.js`);
    worker.on('message', (message) => {
      console.log('received', message);
      console.log(`finish calculation: ${Date.now() - start}`);
      res.end(JSON.stringify(`finish calculation: ${Date.now() - start}`));
    });
  })
  .listen(3000);
