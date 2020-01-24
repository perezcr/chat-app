import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const Header = ({ mainText, secondaryText }) => {
  return (
    <Grid container justify="space-between" alignItems="flex-end">
      <Typography component="h2" variant="h5" color="primary">
        {mainText}
      </Typography>
      <Typography color="textSecondary">{secondaryText}</Typography>
    </Grid>
  );
};

export default Header;
