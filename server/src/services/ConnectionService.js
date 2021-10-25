const { 
  USERS,
  NEW_USER,
  DISCONNECT, 
  USER_DISCONNECTED,
  ADD_MESSAGE,
  GET_MESSAGES
} = require("../util/actions");
const MessagesService = require('./MessagesService');
const UsersService = require("./UsersService");

class ConnectionService {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    socket.on(NEW_USER, (callback) => this.connectUser(callback));
    socket.on(DISCONNECT, () => this.disconnectUser());
    socket.on(ADD_MESSAGE, (message) => this.addMessage(message));
    socket.on(GET_MESSAGES, (receiver, sender) => this.getMessages(receiver, sender));
    io.on('disconnect', (username) => this.disconnectUser(username))
  }

  connectUser(callback) {
    const user = UsersService.add();
    console.log(user);
    this.socket.user = user;
    this.io.emit(USERS, UsersService.getAll());
    callback(user);
  }

  disconnectUser() {
    UsersService.remove(this.socket.user);
    this.io.emit(USERS, UsersService.getAll());
  }

  addMessage(message) {
    MessagesService.add(message);
    this.io.emit(`message-${this.socket.user}`, message);
  }

  getMessages(receiver, sender) {
    return MessagesService.filterBySenderAndReceiver(receiver, sender);
  }
}

module.exports = ConnectionService