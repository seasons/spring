import { StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, TextField } from "@seasons/react-admin"

import { Box, Grid, Typography } from "@material-ui/core"

import { MemberSubViewProps } from "../interfaces"
import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"

// adminKey is the name of the property in Redux's admin store that holds the data we need to update.
// it is defined dynamically MemberView.tsx and used by leaf components to optimistically update state
// after executing a mutation.
export const AccountView: React.FunctionComponent<MemberSubViewProps> = ({ member, adminKey }) => {
  let normalizedInvoices = {}
  member?.invoices?.forEach(inv => (normalizedInvoices[inv.id] = inv))
  const defaultSort = { field: "subscriptionId", order: "ASC" }

  return (
    <Grid container>
      <Grid spacing={3} container>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PersonalDetails adminKey={adminKey} member={member} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PaymentShipping adminKey={adminKey} member={member} />
        </Grid>
      </Grid>

      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Box mt={4}>
          <Typography component="h1" variant="h3">
            Invoices
          </Typography>
          <Datagrid ids={member.invoicesIds} data={normalizedInvoices} currentSort={defaultSort}>
            <TextField source="subscriptionId" label="Invoice #" />
            <StatusField label="Status" />
            <TextField source="closingDate" label="Closing Date" />
            <TextField source="dueDate" label="Due date" />
            <TextField source="amount" label="Amount" />
            <ViewEntityField entityPath="members" entityTab="account" source="user.id" label="Actions" />
          </Datagrid>
        </Box>
      </Grid>
    </Grid>
  )
}
