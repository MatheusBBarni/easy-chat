const { v4 } = require('uuid')

class UsersService {
  constructor() {
    this.users = new Set();
  }

  add() {
    const user = v4()
    this.users.add(user);
    return user
  }

  remove(user) {
    this.users.delete(user);
  }

  getAll() {
    return [...this.users]
  }
}

module.exports = new UsersService();