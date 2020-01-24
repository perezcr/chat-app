import React from 'react';
import moment from 'moment';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  itemRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textRight: {
    flex: '0 1 auto',
    borderRadius: '25px',
    backgroundColor: theme.palette.info.light,
    color: theme.palette.background.paper,
    padding: '3px 10px 3px 10px'
  },
  itemCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  textCenter: {
    flex: '0 1 auto',
    color: theme.palette.secondary.light
  }
}));

const RightMessage = ({ classes, message }) => {
  return (
    <ListItem className={classes.itemRight}>
      <ListItemText className={classes.textRight} primary={message.body} />
    </ListItem>
  );
};

const NotificationMessage = ({ classes, message }) => {
  return (
    <ListItem className={classes.itemCenter}>
      <ListItemText className={classes.textCenter} primary={message.body} />
    </ListItem>
  );
};

const Message = ({ message, currentUser }) => {
  const classes = useStyles();
  const isNotification = message.type === 'notification';
  const isMyMsg = message.user.id === currentUser.id;

  if (isNotification) {
    return <NotificationMessage classes={classes} message={message} />;
  }

  if (isMyMsg) {
    return <RightMessage classes={classes} message={message} />;
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{message.user.nickname.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>

      <ListItemText primary={message.body} secondary={message.user.nickname} />

      <ListItemSecondaryAction>
        <Typography component="p" variant="body2" color="textSecondary">
          {moment(message.date).format('h:mm a')}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Message;
