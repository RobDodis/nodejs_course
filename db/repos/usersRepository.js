const database = require('../models');

class UsersRepository {
  constructor(db = database) {
    this.db = db;
  }

  async create({ firstName, lastName, email }) {
    const { User } = this.db;
    return await User.create({
      firstName,
      lastName,
      email,
    });
  }

  async delete(id) {
    const { User } = this.db;
    return await User.destroy({ where: { id } });
  }
}

module.exports = UsersRepository;
