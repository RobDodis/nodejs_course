const http = require('http');
const config = require('../config');

let requests = Number(config.requests) || 100;

let workerRequestsCounts = {};
while (requests--) {
  http.get('http://localhost:3000', (res) => {
    let data = '';

    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      try {
        const pid = JSON.parse(data).pid;
        workerRequestsCounts[pid] = workerRequestsCounts[pid] ? workerRequestsCounts[pid] + 1 : 1;
      } catch {}
    });
    res.on('error', (a) => {
      console.log(a);
    });
  });
}
