import React from "react"

import { Container, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(20),
    paddingLeft: theme.spacing(10),
  },
}))

export const HistoryView: React.FC = props => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h1">HistoryView</Typography>
    </Container>
  )
}
