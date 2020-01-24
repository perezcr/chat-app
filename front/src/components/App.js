import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import socket from '../socket';
import Header from './Header';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import NicknameForm from './NicknameForm';

const useStyles = makeStyles(theme => ({
  chat: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '600px'
  },
  login: {
    display: 'flex',
    width: '400px',
    height: '600px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function App() {
  const classes = useStyles();
  const initialUserState = {
    id: null,
    nickname: null
  };
  const [user, setUser] = useState(initialUserState);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.on('message', data => {
      setMessages([...messages, data]);
    });

    socket.on('login', ({ activeUsers, user }) => {
      setUser(user);
      setActiveUsers(activeUsers);
    });

    socket.on('new user', ({ activeUsers, user }) => {
      const newMessage = {
        body: `${user.nickname} se ha unido`,
        date: new Date(),
        type: 'notification',
        user
      };
      setActiveUsers(activeUsers);
      setMessages([...messages, newMessage]);
    });

    socket.on('left', ({ activeUsers, user }) => {
      if (user) {
        const newMessage = {
          body: `${user.nickname} ha salido`,
          date: new Date(),
          type: 'notification',
          user
        };
        setMessages([...messages, newMessage]);
      }
      setActiveUsers(activeUsers);
    });

    return () => {
      socket.off('left');
      socket.off('login');
      socket.off('message');
      socket.off('new user');
    };
  }, [messages, user, activeUsers]);

  const handleSendMessage = message => {
    const newMessage = { body: message, date: new Date(), type: 'msg', user };
    setMessages([...messages, newMessage]);
    socket.emit('message', newMessage);
  };

  const handleSetNickname = nickname => {
    const newUser = { ...user, nickname };
    setUser(newUser);
    socket.emit('join', newUser);
  };

  if (!user.id) {
    return (
      <Paper className={classes.login}>
        <NicknameForm className={classes.login} sendNickname={handleSetNickname} />
      </Paper>
    );
  }

  return (
    <Paper className={classes.chat}>
      <Header
        mainText="Chat App"
        secondaryText={`${activeUsers} ${activeUsers !== 1 ? 'usuarios' : 'usuario'}`}
      />
      <MessageList messages={messages} currentUser={user} />
      <MessageForm sendMessage={handleSendMessage} />
    </Paper>
  );
}

export default App;
