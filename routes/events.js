const eventsRouter = (router, eventsService) => {
  // curl --request GET http://localhost:3030/events
  router.get('/events', async (req, res, next) => {
    try {
      const filter = Object.entries(req.query);
      const events = await eventsService.findAll(filter);
      res.json({ events });
    } catch (error) {
      next(error);
    }
  });

  // curl --request GET http://localhost:3030/events/1
  router.get('/events/:eventId', async (req, res, next) => {
    const id = req.params.eventId;
    try {
      const event = await eventsService.findById(id);
      if (event) {
        res.json({ event });
      } else {
        res.status(404).send('not found');
      }
    } catch (error) {
      next(error);
    }
  });

  // curl --request DELETE http://localhost:3030/events/f8786cef-7f43-4ef7-82cd-958f1cef275f
  router.delete('/events/:eventId', async (req, res, next) => {
    const id = req.params.eventId;
    try {
      const deleted = await eventsService.deleteById(id);
      if (deleted) {
        res.status(204).send('');
      } else {
        res.status(404).send('not found');
      }
    } catch (error) {
      next(error);
    }
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
  router.post('/events', async (req, res, next) => {
    try {
      const event = await eventsService.create(req.body);
      res.json({
        id: event.id,
      });
    } catch (error) {
      next(error);
    }
  });

  /*
    curl --request PUT http://localhost:3030/events/31bfe67c-6b4a-42d8-87d7-8108298d4ce9 \
    --header 'Content-Type: application/json' \
    --data '{
      "title": "event 1",
      "location": "New York",
      "date": "2025-11-09",
      "time": "15:15"
    }'
  */
  router.put('/events/:eventId', async (req, res, next) => {
    const id = req.params.eventId;
    try {
      const event = await eventsService.update(id, req.body);
      if (event) {
        res.json(event);
      } else {
        res.status(404).send('not found');
      }
    } catch (error) {
      next(error);
    }
  });

  // curl --request GET http://localhost:3030/events-batch
  router.get('/events-batch', async (req, res, next) => {
    try {
      eventsService.getReadableStream().pipe(res);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = eventsRouter(require('express').Router(), require('../services/events'));
