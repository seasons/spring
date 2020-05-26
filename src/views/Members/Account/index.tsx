import { StatusField } from "fields"
import React from "react"
import { Datagrid, TextField } from "@seasons/react-admin"
import moment from "moment"
import { Button as muiButton, Grid, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { MemberSubViewProps } from "../interfaces"
import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"
import { centsToAmount } from "utils/strings"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import styled from "styled-components"
import { MEMBER_INVOICE_REFUND } from "../queries"
import { useMutation } from "@apollo/react-hooks"
import { CreditNoteReasonCode } from "../Member.types"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5),
  },
}))

interface ActionButtonsProps {
  record?: { id: string }
  label?: string
  processRefund: (record: {}) => void
}

const BtnIcon = styled(OpenInNewIcon)`
  font-size: 18px;
  padding-left: 5px;
`

const Button = styled(muiButton)`
  margin-right: 10px;
`

const ActionButtons: React.FC<ActionButtonsProps> = ({ record = {}, label, processRefund }) => {
  const domain = process.env.NODE_ENV === "production" ? "seasons" : "seasons-test"
  const invoiceURL = `https://${domain}.chargebee.com/d/invoices/${record.id}`

  return (
    <>
      <a href={invoiceURL} target="_blank" rel="noopener noreferrer">
        <Button color="primary" size="small" variant="outlined">
          View <BtnIcon />
        </Button>
      </a>

      <Button color="primary" size="small" variant="outlined" onClick={() => processRefund(record)}>
        Refund
      </Button>
    </>
  )
}

// adminKey is the name of the property in Redux's admin store that holds the data we need to update.
// it is defined dynamically MemberView.tsx and used by leaf components to optimistically update state
// after executing a mutation.
export const AccountView: React.FunctionComponent<MemberSubViewProps> = ({ member, adminKey }) => {
  const [issueRefund] = useMutation(MEMBER_INVOICE_REFUND)
  const classes = useStyles()

  const defaultSort = { field: "id", order: "ASC" }
  let normalizedInvoices = {}
  let invoicesIds: string[] = []
  member?.invoices?.forEach(inv => {
    console.log("invoice is", inv)
    inv.closingDate = moment(inv.closingDate).format("MM/DD/YYYY")
    inv.dueDate = moment(inv.dueDate).format("MM/DD/YYYY")
    inv.amountNormalized = centsToAmount(inv.amount)
    normalizedInvoices[inv.id] = inv
    invoicesIds.push(inv.id)
  })

  const processRefund = record => {
    console.log("Processing, record is ", record)

    const inputValues = {
      invoiceId: record.id,
      refundAmount: record.amount,
      comment: "testing admin",
      customerNotes: "well playa damn",
      reasonCode: CreditNoteReasonCode[3],
    }

    console.log("input is ", inputValues)

    issueRefund({
      variables: {
        input: inputValues,
      },
    })
      .then(() => {
        console.log(" member created!", inputValues)
      })
      .catch(error => {
        console.log("error refunding invoice:", error)
      })
  }

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PersonalDetails adminKey={adminKey} member={member} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <PaymentShipping adminKey={adminKey} member={member} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Typography component="h1" variant="h3">
            Invoices
          </Typography>
          <Datagrid ids={invoicesIds} data={normalizedInvoices} currentSort={defaultSort}>
            <TextField source="id" label="Invoice ID" />
            <TextField source="subscriptionId" label="Subscription ID" />
            <StatusField label="Status" />
            <TextField source="closingDate" label="Closing Date" />
            <TextField source="dueDate" label="Due date" />
            <TextField source="amountNormalized" label="Amount" />
            <ActionButtons label="Actions" processRefund={processRefund} />
          </Datagrid>
        </Grid>
      </Grid>
    </>
  )
}
