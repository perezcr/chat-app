import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const MessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleInputChange = event => {
    setMessage(event.target.value);
  };

  const classes = useStyles();
  return (
    <Paper
      className={classes.root}
      component="form"
      elevation={2}
      onSubmit={handleSubmit}
    >
      <InputBase
        autoComplete="off"
        autoFocus
        className={classes.input}
        name="message"
        onChange={handleInputChange}
        placeholder="Escriba aquí..."
        value={message}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        color="primary"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageForm;
