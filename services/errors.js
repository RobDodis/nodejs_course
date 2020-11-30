const mapErrors = (errors) =>
  errors.map(({ message, type, path }) => ({
    message,
    type,
    path,
  }));

class NotFound extends Error {
  constructor(message) {
    super(message, id);
    this.message = message;
    this.name = 'NotFound';
  }
}

module.exports = {
  mapErrors,
  NotFound,
};
