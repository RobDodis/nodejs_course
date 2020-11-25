class EventController {
  constructor(db) {
    this.db = db;
  }

  getList = async (req, res, next) => {
    const { Event, User } = this.db;
    const location = req.query.location;
    try {
      const query = {
        attributes: Event.getOwnAttributes(),
        include: [
          {
            model: User,
            as: 'participants',
            attributes: User.getOwnAttributes(),
          },
        ],
      };

      if (location) {
        query.where = {
          location,
        };
      }

      const events = await Event.findAll(query);

      res.json({ events });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { Event, User } = this.db;
    const id = +req.params.eventId;
    try {
      const query = {
        attributes: Event.getOwnAttributes(),
        include: [
          {
            model: User,
            as: 'participants',
            attributes: User.getOwnAttributes(),
          },
        ],
        where: {
          id,
        },
      };
      const event = await Event.findOne(query);
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
    const { Event } = this.db;
    const id = +req.params.eventId;
    try {
      const deleted = await Event.destroy({ where: { id } });

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
    const { Event, User, UserEvent, sequelize } = this.db;
    const { title, location, date, creatorId, participants } = req.body;
    let transaction;

    try {
      const owner = await User.findByPk(creatorId);

      if (!owner) {
        return res.status(404).send(`User ${creatorId} Not found`);
      }

      transaction = await sequelize.transaction();
      const event = await Event.create({
        title,
        location,
        date,
        creatorId,
      });

      const userEventData = Array.from(new Set(participants.concat(creatorId))).map((userId) => ({
        userId: +userId,
        eventId: event.id,
      }));

      await UserEvent.bulkCreate(userEventData);
      await transaction.commit();

      res.json({
        id: event.id,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  };

  update = async (req, res, next) => {
    const { Event, User, UserEvent, sequelize } = this.db;
    const id = +req.params.eventId;
    const { title, location, date, participants } = req.body;

    try {
      const [count, [event]] = await Event.update(
        {
          title,
          location,
          date,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (count === 0) {
        return res.status(404).send(`Event ${id} Not found`);
      }

      res.json(event);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = EventController;
