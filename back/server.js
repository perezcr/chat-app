const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

// Set up server
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

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`App running on port ${port}`));
