const { fork } = require('child_process');
const http = require('http');

http
  .createServer((_, res) => {
    const start = Date.now();
    console.log(`receive request: ${start}`);
    const child = fork(`${__dirname}/child.js`);
    child.on('message', (message) => {
      child.kill();
      console.log('received from child', message);
      console.log(`finish calculation: ${Date.now() - start}`);
      res.end(JSON.stringify(`finish calculation: ${Date.now() - start}`));
    });
    child.send(35);
  })
  .listen(3000);
