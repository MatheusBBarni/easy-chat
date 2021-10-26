class MessagesService {
  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push({
      ...message,
      createdAt: new Date().toString()
    });
  }

  getAll() {
    return this.messages;
  }
}

module.exports = new MessagesService();