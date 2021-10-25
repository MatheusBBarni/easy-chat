class MessagesService {
  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push({
      ...message,
      createdAt: new Date()
    });
  }

  getAll() {
    return this.messages;
  }

  filterBySenderAndReceiver(sender, receiver) {
    return this.messages.filter((message) => {
      if (message.users.includes(sender) && message.users.includes(receiver)) {
        return message;
      }
      return;
    })
  }
}

module.exports = new MessagesService();