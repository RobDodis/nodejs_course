process.on('message', (message) => {
  console.log('received from parent', message);
  process.send('pong');
});
