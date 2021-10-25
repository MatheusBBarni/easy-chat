const cors = require('cors');
const express = require("express");
const socket = require("socket.io");

const ConnectionService = require('./services/ConnectionService');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}))

const PORT = 3333;

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

io.on("connection", function (socket) {
  new ConnectionService(io, socket)
});