const User = require('../models/userModel');

class UserRepository {
  async findUserByUsername(username) {
    return await User.findOne({ where: { username } });
  }

  async findUserById(id) {
    return await User.findOne({ where: { id } });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(user) {
    return await user.save();
  }
}

module.exports = new UserRepository();
