import React from "react"
import { Redirect } from "react-router-dom"

import { colors, Container, Divider, Tab, Tabs, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  tab: {
    textTransform: "none",
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

export interface NewProductViewProps {
  history: any
  match: any
  props?: any
}

export const NewProductView: React.FunctionComponent<NewProductViewProps> = ({ match, history, props }) => {
  const classes = useStyles()

  return (
    <Container maxWidth={false}>
    </Container>
  )
}