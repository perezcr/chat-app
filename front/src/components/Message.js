import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

const Message = ({ message }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt={message.username} />
      </ListItemAvatar>
      <ListItemText primary={message.body} />
    </ListItem>
  );
};

export default Message;
