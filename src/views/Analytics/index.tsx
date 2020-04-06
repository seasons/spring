import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Container, Theme, Typography } from "@material-ui/core"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(20),
    paddingLeft: theme.spacing(10),
  },
}))

function Analytics() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h1">All them fancy charts will go here!</Typography>
    </Container>
  )
}

export default Analytics
