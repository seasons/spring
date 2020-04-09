import React from 'react';

import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Header from './Header';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(20),
    paddingLeft: theme.spacing(10),
  },
}))

export const OverviewView: React.FC = (props) => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Header className={classes.root} />
    </Container>
  )
}
