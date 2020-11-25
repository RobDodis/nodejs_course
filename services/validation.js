const mapValidationErrors = (errors) =>
  errors.map(() => ({
    message: 'Validation isEmail on email failed',
    path: 'email',
  }));

module.exports = {
  mapValidationErrors,
};
