const cluster = require('cluster');
const http = require('http');
const fib = require('./fibonacci');
let workers = 6;

if (cluster.isMaster) {
  console.log(`start forking ${workers}`);
  while (workers--) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((_, res) => {
      fib(30);
      res.writeHead(200).end(
        JSON.stringify({
          pid: process.pid,
        })
      );
    })
    .listen('3000', () => console.log(`${process.pid} listening on port 3000`));
}

/**
 * if 6 workers - each worker handle 16-18 requests
 * if 4 workers - each worker handle ~25 requests
 */
