### api that blocks loop

```
  node 2_lesson/blocking.js

  node 2_lesson/request_server.js -requests=10
```

### create cluster with 6 workers

```
  node 2_lesson/cluster.js

  node 2_lesson/request_server.js
```

### calculate n-th Fibonacci number on worker thread

```
  node 2_lesson/worker/master.js

  node 2_lesson/request_server.js
```

### calculate n-th Fibonacci number on child process

```
  node 2_lesson/childProcess/master.js

  node 2_lesson/request_server.js
```
