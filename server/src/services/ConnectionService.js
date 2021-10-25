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

    socket.on(NEW_USER, (username) => this.connectUser(username));
    socket.on(DISCONNECT, (username) => this.disconnectUser(username));
    socket.on(ADD_MESSAGE, (message, users) => this.addMessage(message, users));
    socket.on(GET_MESSAGES, (receiver, sender) => this.getMessages(receiver, sender));
  }

  connectUser(username) {
    UsersService.add(username);
    this.socket.user = username;
    this.io.emit(USERS, UsersService.getAll());
  }

  disconnectUser(username) {
    UsersService.remove(username);
    this.io.emit(USER_DISCONNECTED, username);
    this.io.emit(USERS, UsersService.getAll());
  }

  addMessage(message, users) {
    MessagesService.add({ ...message, users });
    this.io.emit(`message-${this.socket.user}`, message);
  }

  getMessages(receiver, sender) {
    return MessagesService.filterBySenderAndReceiver(receiver, sender);
  }
}

module.export = ConnectionService