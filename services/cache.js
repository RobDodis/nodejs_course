const LRU = require('lru-cache');

const cache = new LRU(500);

// 10 minutes
const interval = 10 * 60 * 60 * 1000;

setInterval(cache.prune, interval);

module.exports = cache;
