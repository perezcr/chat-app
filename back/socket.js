const http = require('http');
const socketIo = require('socket.io');

const socket = app => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', socket => {
    console.log('User connected!');

    socket.on('join', user => {
      socket.user = { ...user, id: socket.client.id };
      const activeUsers = socket.client.conn.server.clientsCount;
      socket.emit('login', { activeUsers, user: socket.user });
      socket.broadcast.emit('new user', { activeUsers, user: socket.user });
    });

    socket.on('message', msg => {
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected!');
      socket.broadcast.emit('left', {
        activeUsers: socket.client.conn.server.clientsCount,
        user: socket.user
      });
    });
  });

  return server;
};

module.exports = socket;
