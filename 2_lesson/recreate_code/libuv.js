const crypto = require('crypto');
const start = Date.now();

console.log(`UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE || 4}`);

function logHashTime() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log(`hash: ${Date.now() - start}`);
  });
}

let calls = 10;
while (calls--) {
  logHashTime();
}

/**
 * % node 2_lesson/recreate_code/libuv.js
 *
 * UV_THREADPOOL_SIZE: 4
 *
 * hash: 1050
 * hash: 1050
 * hash: 1070
 * hash: 1108
 * hash: 2118
 * hash: 2118
 * hash: 2129
 * hash: 2158
 * hash: 2649
 * hash: 2655
 */

/**
 * % UV_THREADPOOL_SIZE=6 node 2_lesson/recreate_code/libuv.js
 *
 * UV_THREADPOOL_SIZE: 6
 *
 * hash: 1556
 * hash: 1586
 * hash: 1586
 * hash: 1596
 * hash: 1620
 * hash: 1675
 * hash: 2654
 * hash: 2680
 * hash: 2685
 * hash: 2705
 */
