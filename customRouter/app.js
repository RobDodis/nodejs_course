const server = require('./server');
const config = require('../config');
const logger = require('../logger');

logger.log(`Environment: ${config.env}`);

const app = server();

app.get('/', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello world' }));
});

/*
  curl http://localhost:3030/events
*/
app.get('/events', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: [], message: 'events' }));
});

/*
  curl --request POST http://localhost:3030/events \
      --header 'Content-Type: application/json' \
      --data '{
        "title": "event 1",
        "location": "New York",
        "date": "2020-11-09",
        "time": "15:15"
      }'
*/
app.post('/events', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: req.body, message: 'post' }));
});

/*
  curl --request PUT http://localhost:3030/events/12 \
      --header 'Content-Type: application/json' \
      --data '{
        "title": "event 1",
        "location": "New York",
        "date": "2020-11-09",
        "time": "15:15"
      }'
*/
app.put('/events/:id', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: req.body, routeParams: req.routeParams, message: 'put' }));
});

app.listen(config.PORT, () => {
  logger.log(`Listening on port ${config.PORT}...`);
});
