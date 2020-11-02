const express = require('express');
const http = require('http');
const fib = require('./fibonacci');

http
  .createServer((_, res) => {
    const start = Date.now();
    console.log(`receive calculation: ${start}`);
    const resp = fib(40);
    console.log(`finish calculation: ${Date.now() - start}`);
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: resp }));
  })
  .listen(3000);
