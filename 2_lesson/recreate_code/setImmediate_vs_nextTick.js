setImmediate(() => console.log('immediate 1'));
setImmediate(() => {
  console.log('immediate 2');
  process.nextTick(() => console.log('next tick'));
});
setImmediate(() => console.log('immediate 3'));
setImmediate(() => console.log('immediate 4'));

/**
 * %  node 2_lesson/recreate_code/setImmediate_vs_nextTick.js
 *
 * immediate 1
 * immediate 2
 * next tick
 * immediate 3
 * immediate 4
 */
