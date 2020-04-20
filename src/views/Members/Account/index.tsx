import React from "react"

import { Grid, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5),
  },
}))

export interface AccountViewProps {
  history: any
  match: any
  props?: any
}

export const AccountView: React.FunctionComponent<AccountViewProps> = ({ match, history, props }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <PersonalDetails />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <PaymentShipping />
      </Grid>
    </Grid>
  )
}
