class MessagesService {
  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push({
      ...message,
      createdAt: new Date()
    });
    console.log(this.messages);
  }

  getAll() {
    return this.messages;
  }

  filterBySenderAndReceiver(sender, receiver) {
    return this.messages.filter((message) => {
      if (message.users.contains(sender) && message.users.contains(receiver)) {
        return message;
      }
      return;
    })
  }
}

module.exports = new MessagesService();