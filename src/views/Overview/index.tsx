import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Container, Theme } from "@material-ui/core"
import Header from "./Header"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(20),
    paddingLeft: theme.spacing(10),
  },
}))

function Overview() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Header className={classes.root} />
    </Container>
  )
}

export default Overview
