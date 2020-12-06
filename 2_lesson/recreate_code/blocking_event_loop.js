function repeat(num) {
  while (num--) {}
}

const start = new Date();
repeat(10e9);
setTimeout(() => console.log(`timeout: ${new Date() - start}`));
process.nextTick(() => console.log(`next: ${new Date() - start}`));

/**
 * % node 2_lesson/recreate_code/blocking_event_loop.js
 *
 * next: 11171
 * timeout: 11177
 */
