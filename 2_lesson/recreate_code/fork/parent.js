const { fork } = require('child_process');
const child = fork(`${__dirname}/child.js`);

child.on('message', (message) => {
  console.log('received from child', message);
});

child.send('ping');
