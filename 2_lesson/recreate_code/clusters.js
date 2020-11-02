const cluster = require('cluster');
const http = require('http');
let cpus = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`start forking ${cpus}`);
  while (cpus--) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((_, res) => {
      res.writeHead(200).end(`pid: ${process.pid}`);
    })
    .listen('3000', () => console.log(`${process.pid} listening on port 3000`));
}
