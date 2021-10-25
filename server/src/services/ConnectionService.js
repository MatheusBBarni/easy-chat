const { 
  USERS,
  NEW_USER,
  DISCONNECT,
  ADD_MESSAGE,
  GET_MESSAGES,
  CHANGE_ROOM
} = require("../util/actions");
const generateRoomName = require("../util/generate-room-name");
const MessagesService = require('./MessagesService');
const UsersService = require("./UsersService");

class ConnectionService {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    socket.on(NEW_USER, (callback) => this.connectUser(callback));
    socket.on(DISCONNECT, () => this.disconnectUser());
    socket.on(ADD_MESSAGE, (message, callback) => this.addMessage(message, callback));
    socket.on(GET_MESSAGES, (receiver, callback) => this.getMessages(receiver, callback));
    socket.on(CHANGE_ROOM, (receiver) => this.changeRoom(receiver));
    io.on(DISCONNECT, (username) => this.disconnectUser(username));
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

  addMessage(message, callback) {
    MessagesService.add(message);
    callback(MessagesService.filterBySenderAndReceiver(message.receiver, this.socket.user));
  }

  getMessages(receiver, callback) {
    callback(MessagesService.filterBySenderAndReceiver(receiver, this.socket.user));
  }

  changeRoom(receiver) {
    socket.join(generateRoomName(receiver, this.socket.user));
  }
}

module.exports = ConnectionService