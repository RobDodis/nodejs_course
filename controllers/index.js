const { eventsRepository, userRepository } = require('../db/repos');
const UserController = require('./users');
const EventController = require('./events');
const AuthController = require('./auth');

const jwtHelpers = require('../services/JWT');

const authController = new AuthController(userRepository, jwtHelpers);
const userController = new UserController(userRepository);
const eventController = new EventController(eventsRepository);

module.exports = {
  userController,
  eventController,
  authController,
};
