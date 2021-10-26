const {
  USERS,
  NEW_USER,
  DISCONNECT,
  ADD_MESSAGE,
  GET_MESSAGES,
  CHANGE_ROOM
} = require("../util/actions");
const MessagesService = require('../services/MessagesService');
const UsersService = require("../services/UsersService");

class ConnectionController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    socket.on(NEW_USER, (callback) => this.connectUser(callback));
    socket.on(DISCONNECT, () => this.disconnectUser());
    socket.on(ADD_MESSAGE, (message, callback) => this.addMessage(message, callback));
    socket.on(GET_MESSAGES, () => this.getMessages());
    socket.on(CHANGE_ROOM, (receiver) => this.changeRoom(receiver));
    io.on(DISCONNECT, (username) => this.disconnectUser(username));
  }

  connectUser(callback) {
    const user = UsersService.add();
    this.socket.user = user;
    this.io.emit(USERS, UsersService.getAll());
    callback(user);
  }

  disconnectUser() {
    UsersService.remove(this.socket.user);
    this.io.emit(USERS, UsersService.getAll());
  }

  addMessage(message, callback) {
    MessagesService.add(message);
    this.io.emit(GET_MESSAGES, MessagesService.getAll());
    callback('ok');
  }

  getMessages() {
    this.io.emit(GET_MESSAGES, MessagesService.getAll());
  }

  changeRoom(receiver) {
    this.socket.receiver = receiver
    this.io.emit(GET_MESSAGES, MessagesService.getAll());
  }
}

module.exports = ConnectionController