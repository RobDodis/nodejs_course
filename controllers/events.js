const { NotFound } = require('../services/errors');

class EventController {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  getList = async (req, res, next) => {
    try {
      const events = await this.eventsRepository.findAllEvents(req.query);

      return res.json({ events });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const id = +req.params.eventId;
    try {
      const event = await this.eventsRepository.getEvent(id);
      if (event) {
        res.json({ data: event });
      } else {
        res.status(404).send('Not found');
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const id = +req.params.eventId;
    try {
      const deleted = await this.eventsRepository.delete(id);
      if (deleted) {
        res.status(204).send('');
      } else {
        res.status(404).send('Not found');
      }
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const event = await this.eventsRepository.create(req.body);
      res.json(event);
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).send(error.message);
      }

      next(error);
    }
  };

  update = async (req, res, next) => {
    const id = +req.params.eventId;
    try {
      const { event } = await this.eventsRepository.updateOne(id, req.body);

      if (!event) {
        return res.status(404).send(`Event ${id} Not found`);
      }

      res.json(event);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = EventController;
