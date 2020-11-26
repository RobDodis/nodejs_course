const { mapErrors } = require('../services/errors');

class UserController {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  create = async (req, res, next) => {
    try {
      const user = await this.usersRepository.create(req.body);
      res.json(user);
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          details: mapErrors(error.errors),
        });
      }
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const id = +req.params.userId;
    try {
      const deleted = await this.usersRepository.delete(id);

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
