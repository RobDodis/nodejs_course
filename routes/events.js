const EventController = require('../controllers/events');

const eventsRouter = (router, db) => {
  const eventController = new EventController(db);
  // curl --request GET http://localhost:3030/events
  router.get('/events', eventController.getList);

  // curl --request GET http://localhost:3030/events/1
  router.get('/events/:eventId', eventController.getById);

  // curl --request DELETE http://localhost:3030/events/8
  router.delete('/events/:eventId', eventController.delete);

  /*
    curl --request POST http://localhost:3030/events \
    --header 'Content-Type: application/json' \
    --data '{
      "title": "New Event",
      "location": "New York",
      "date": "2020-11-24T19:34:59.746Z",
      "creatorId": 3,
      "participants": [1]
    }'
  */
  router.post('/events', eventController.create);

  /*
    curl --request PUT http://localhost:3030/events/1 \
    --header 'Content-Type: application/json' \
    --data '{
      "title": "New Event",
      "location": "New York",
      "date": "2020-11-24T19:34:59.746Z"
    }'
  */
  router.put('/events/:eventId', eventController.update);

  return router;
};

module.exports = eventsRouter(require('express').Router(), require('../db/models'));
