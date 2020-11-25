const { mapValidationErrors } = require('../services/validation');

class UserController {
  constructor(db) {
    this.db = db;
  }

  create = async (req, res, next) => {
    const { User } = this.db;
    const { firstName, lastName, email } = req.body;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
      });

      res.json(user);
    } catch (error) {
      if (error.errors) {
        return res.status(404).json({
          details: mapValidationErrors(error.errors),
        });
      }

      next(error);
    }
  };

  delete = async (req, res, next) => {
    const { User } = this.db;
    const id = +req.params.userId;

    try {
      const deleted = await User.destroy({ where: { id } });

      if (deleted) {
        res.status(204).send('');
      } else {
        res.status(404).send('Not found');
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
