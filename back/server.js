const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Set up database
// require('./db');

// Set up server
const server = http.createServer(app);
const io = socketIo(server);

let numUsers = 0;

io.on('connection', socket => {
  console.log('User connected!');
  ++numUsers;

  console.log('Usuarios: ', numUsers);
  socket.on('message', ({ body, username }) => {
    socket.emit('received', { body, username });
  });

  socket.on('disconnect', () => console.log('User disconnected!'));
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`App running on port ${port}`));
