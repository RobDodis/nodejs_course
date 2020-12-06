setTimeout(() => console.log('timeout 1'));
setTimeout(() => console.log('timeout 2'));
setTimeout(() => console.log('timeout 3'));
setTimeout(() => console.log('timeout 4'));

process.nextTick(() => console.log('next tick 1'));

queueMicrotask(() => console.log('microtask 1'));

process.nextTick(() => console.log('next tick 2'));

Promise.resolve().then(() => console.log('promise 1'));
Promise.resolve()
  .then(() => {
    console.log('promise 2');
    process.nextTick(() => console.log('next tick in promise'));
    return Promise.resolve();
  })
  .then(() => {
    console.log('promise 3');
  });

setTimeout(() => {
  console.log('timeout 5');
  Promise.resolve().then(() => console.log('promise 4'));
});
setTimeout(() => console.log('timeout 6'));

console.log('sync code');

/**
 * %  node 2_lesson/recreate_code/promises_and_microtasks.js
 *
 * sync code
 * next tick 1
 * next tick 2
 * microtask 1
 * promise 1
 * promise 2
 * promise 3
 * next tick in promise
 * timeout 1
 * timeout 2
 * timeout 3
 * timeout 4
 * timeout 5
 * promise 4
 * timeout 6
 */
