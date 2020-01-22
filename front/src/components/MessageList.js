import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

import Message from './Message';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const MessageList = ({ messages }) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {messages.map((msg, index) => (
        <Message message={msg} key={index} />
      ))}
    </List>
  );
};

export default MessageList;
