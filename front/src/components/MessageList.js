import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

import Message from './Message';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflowY: 'scroll',
    margin: '10px 0 10px 0',
    backgroundColor: theme.palette.background.paper
  }
}));

const MessageList = ({ messages, currentUser }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <List dense className={classes.root}>
      {messages.map((msg, index) => (
        <Message message={msg} currentUser={currentUser} key={index} />
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
};

export default MessageList;
