const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')

const ConnectionService = require('./services/ConnectionService')

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req) => {
  req.send('Server is up and running')
});

io.on('connection', (socket) => {
  console.log('User connected');
  new ConnectionService(io, socket)
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
})

