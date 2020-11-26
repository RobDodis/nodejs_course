const { eventsRepository, userRepository } = require('../db/repos');
const UserController = require('./users');
const EventController = require('./events');

const userController = new UserController(userRepository);
const eventController = new EventController(eventsRepository);

module.exports = {
  userController,
  eventController,
};
