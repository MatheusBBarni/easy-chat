const { uuid } = require('uuidv4');

class UsersService {
  constructor() {
    this.users = new Set();
  }

  add() {
    const user = uuid()
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