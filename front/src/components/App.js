import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import socket from '../services/socket';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '30%',
    minWidth: 300
  }
}));

function App() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('effect');
    socket.on('received', data => {
      console.log(messages);
      const newMessages = [...messages, data];
      setMessages(newMessages);
    });

    return () => socket.off('message');
  }, []);

  const handleSendMessage = message => {
    socket.emit('message', { body: message, username: 'John Doe' });
  };

  return (
    <Paper className={classes.paper}>
      <Title>Chat App</Title>
      <MessageList messages={messages} />
      <SendMessageForm sendMessage={handleSendMessage} />
    </Paper>
  );
}

export default App;
