const database = require('../models');
const UsersRepository = require('./usersRepository');
const EventsRepository = require('./eventsRepository');

const userRepository = new UsersRepository(database);
const eventsRepository = new EventsRepository(database, userRepository);

module.exports = {
  eventsRepository,
  userRepository,
};
