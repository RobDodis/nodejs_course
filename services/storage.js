const LRU = require('lru-cache');

const cache = new LRU(500);

module.exports = cache;
