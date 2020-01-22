import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
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

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  const handleInputChange = event => {
    setMessage(event.target.value);
  };

  const classes = useStyles();
  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'type here' }}
        name="message"
        onChange={handleInputChange}
        placeholder="Type here..."
        value={message}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default SendMessageForm;
