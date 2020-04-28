import { StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, List, TextField } from "react-admin"

import { Grid, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberSubViewIfc } from "../interfaces"
import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5),
  },
}))

export const AccountView: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PersonalDetails member={member} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PaymentShipping member={member} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Typography component="h1" variant="h3">
            Invoices
          </Typography>
          <List
            perPage={10}
            hasCreate={false}
            hasEdit={false}
            hasList={true}
            hasShow={true}
            resource={"Customer"}
            basePath="/members"
            exporter={false}
          >
            <Datagrid>
              <TextField source="detail.shippingAddress.city" label="Invoice #" />
              <StatusField label="Status" />
              <TextField source="detail.shippingAddress.city" label="Date" />
              <TextField source="detail.shippingAddress.state" label="Amount" />
              <TextField source="plan" label="Billing Period" />
              <TextField source="plan" label="Next Billing Date" />
              <ViewEntityField entityPath="members" entityTab="account" source="user.id" label="Actions" />
            </Datagrid>
          </List>
        </Grid>
      </Grid>
    </>
  )
}
