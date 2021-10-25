const { uuid } = require('uuidv4');

class UsersService {
  constructor() {
    this.users = new Map();
  }

  add(user) {
    this.users.set(user, uuid());
  }

  remove(user) {
    this.users.delete(user);
  }

  getAll() {
    return [...this.users]
  }
}

module.exports = new UsersService();