class UsersRepository {
  constructor(db) {
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

  getOwnAttributes() {
    return ['firstName', 'lastName', 'email', 'id'];
  }
}

module.exports = UsersRepository;
