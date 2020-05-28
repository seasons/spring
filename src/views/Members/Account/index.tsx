import { StatusField } from "fields"
import React, { useState } from "react"
import { Datagrid, TextField } from "@seasons/react-admin"
import moment from "moment"
import { Box, Card, Button as muiButton, Grid, Typography, Snackbar } from "@material-ui/core"
import { MemberSubViewProps, ActionButtonsProps } from "../interfaces"
import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"
import { centsToAmount } from "utils/strings"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import styled from "styled-components"
import { MEMBER_INVOICE_REFUND } from "../queries"
import { useMutation } from "@apollo/react-hooks"
import { RefundInvoiceModal } from "./RefundInvoice"
import { Alert, Color } from "@material-ui/lab"

const STATUS_REFUNDED = "Refunded"

const BtnIcon = styled(OpenInNewIcon)`
  font-size: 18px;
  padding-left: 5px;
`

const Button = styled(muiButton)`
  margin-right: 10px;
`

const ActionButtons: React.FC<ActionButtonsProps> = ({ record = {}, label, handleAction }) => {
  const domain = process.env.NODE_ENV === "production" ? "seasons" : "seasons-test"
  const invoiceURL = `https://${domain}.chargebee.com/d/invoices/${record.id}`

  return (
    <>
      <a href={invoiceURL} target="_blank" rel="noopener noreferrer">
        <Button color="primary" size="small" variant="outlined">
          View <BtnIcon />
        </Button>
      </a>

      <Button
        disabled={record.status === STATUS_REFUNDED}
        color="primary"
        size="small"
        variant="outlined"
        onClick={() => handleAction(record)}
      >
        Refund
      </Button>
    </>
  )
}

// adminKey is the name of the property in Redux's admin store that holds the data we need to update.
// it is defined dynamically in MemberView.tsx and used by leaf components to optimistically update state
// after executing a mutation.
export const AccountView: React.FunctionComponent<MemberSubViewProps> = ({ member, adminKey, match }) => {
  const [issueRefund] = useMutation(MEMBER_INVOICE_REFUND)
  const [refundModalIsOpen, setRefundModalOpen] = useState(false)

  const [invoiceToRefund, setInvoiceToRefund] = useState({
    id: "",
    amount: 0,
    amountNormalized: "",
  })

  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })

  const defaultSort = { field: "id", order: "ASC" }
  let normalizedInvoices = {}
  let invoicesIds: string[] = []

  member?.invoices?.forEach(inv => {
    inv.status = inv.creditNotes[0]?.status === STATUS_REFUNDED ? STATUS_REFUNDED : inv.status
    inv.tooltipText = inv.creditNotes[0]?.reasonCode
    inv.closingDateNormalized = moment(inv.closingDate).format("MM/DD/YYYY")
    inv.dueDateNormalized = moment(inv.dueDate).format("MM/DD/YYYY")
    inv.amountNormalized = centsToAmount(inv.amount)
    normalizedInvoices[inv.id] = inv
    invoicesIds.push(inv.id)
  })

  const [stateInvoices, setStateInvoices] = useState(normalizedInvoices)

  const handleRefundModalOpen = record => {
    setInvoiceToRefund(record)
    setRefundModalOpen(true)
  }

  const handleRefundModalClose = () => {
    setRefundModalOpen(false)
  }

  const processRefund = input => {
    const inputValues = {
      invoiceId: input.id,
      refundAmount: input.amount,
      comment: input.comment,
      customerNotes: input.customerNotes,
      reasonCode: input.reasonCode,
    }

    issueRefund({
      variables: {
        input: inputValues,
      },
    })
      .then(() => {
        input.status = STATUS_REFUNDED
        input.tooltipText = input.reasonCode

        // update state optimistically to reflect refund in UI
        setStateInvoices(currentValues => ({
          ...currentValues,
          [input.id]: input,
        }))

        // display success notification
        toggleSnackbar({
          show: true,
          message: "Refund Processed",
          status: "success",
        })
      })
      .catch(error => {
        console.error("error refunding invoice:", error)
        toggleSnackbar({
          show: true,
          message: "Error processing refund",
          status: "error",
        })
      })
      .finally(() => setRefundModalOpen(false))
  }

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  const rowStyle = () => ({
    height: "50px",
  })

  return (
    <>
      <Grid container spacing={3}>
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
          <Box m={3}></Box>
          <Card style={{ width: "100%" }}>
            <Datagrid rowStyle={rowStyle} ids={invoicesIds} data={stateInvoices} currentSort={defaultSort}>
              <TextField source="id" label="Invoice ID" />
              <TextField source="subscriptionId" label="Subscription ID" />
              <StatusField label="Status" />
              <TextField source="closingDateNormalized" label="Closing Date" />
              <TextField source="dueDateNormalized" label="Due date" />
              <TextField source="amountNormalized" label="Amount" />
              <ActionButtons label="Actions" handleAction={record => handleRefundModalOpen(record)} />
            </Datagrid>
          </Card>
        </Grid>
      </Grid>
      <RefundInvoiceModal
        title="Refund Invoice"
        invoice={invoiceToRefund}
        onSave={refundInput => processRefund(refundInput)}
        onClose={handleRefundModalClose}
        open={refundModalIsOpen}
      />
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
