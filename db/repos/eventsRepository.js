const database = require('../models');
const { NotFound } = require('../../services/errors');

class EventsRepository {
  constructor(db = database) {
    this.db = db;
  }

  async findAllEvents(params) {
    const { Event, User } = this.db;

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

    if (params.location) {
      query.where = {
        location: query.location,
      };
    }

    return await Event.findAll(query);
  }

  async getEvent(id) {
    const { Event, User } = this.db;
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

    return await Event.findOne(query);
  }

  async delete(id) {
    const { Event } = this.db;

    return await Event.destroy({ where: { id } });
  }

  async create(data) {
    const { Event, User, UserEvent, sequelize } = this.db;
    const { title, location, date, creatorId, participants } = data;

    let transaction;
    try {
      const owner = await User.findByPk(creatorId);

      if (!owner) {
        throw new NotFound(`User ${creatorId} Not found`);
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

      return event;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async updateOne(id, { title, location, date }) {
    const { Event } = this.db;
    const [_, [event]] = await Event.update(
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

    return {
      event,
    };
  }
}

module.exports = EventsRepository;
