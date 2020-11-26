const mapErrors = (errors) =>
  errors.map(({ message, type, path }) => ({
    message,
    type,
    path,
  }));

module.exports = {
  mapErrors,
};
