import { StatusField, ActionButtons } from "fields"
import { makeStyles } from "@material-ui/styles"
import React, { useState } from "react"
import { Datagrid, TextField } from "@seasons/react-admin"
import moment from "moment"
import { Box, Card, Button, Grid, CardHeader, Divider, Theme } from "@material-ui/core"
import { MemberSubViewProps, ActionButtonProps } from "../interfaces"
import { PaymentShipping } from "./PaymentShipping"
import { PersonalDetails } from "./PersonalDetails"
import { centsToAmount, splitTitleCase } from "utils/strings"
import { formatChargebeeInvoiceURL } from "utils/url"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import styled from "styled-components"
import { MEMBER_INVOICE_REFUND } from "../queries"
import { useMutation } from "@apollo/react-hooks"
import { RefundInvoiceModal } from "./RefundInvoice"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { Admissions } from "./Admissions"

const STATUS_REFUNDED = "Refunded"

const BtnIcon = styled(OpenInNewIcon)`
  font-size: 18px;
  padding-left: 5px;
`

const ViewButton = (props: ActionButtonProps) => {
  return (
    <a
      style={{ textDecoration: "none" }}
      href={formatChargebeeInvoiceURL(props.record?.id)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box component="span" mr={2}>
        <Button color="primary" size="small" variant="outlined">
          View <BtnIcon />
        </Button>
      </Box>
    </a>
  )
}

const RefundButton = (props: ActionButtonProps) => {
  return (
    <Button
      disabled={props.record?.status === STATUS_REFUNDED}
      color="primary"
      size="small"
      variant="outlined"
      onClick={() => props.action(props.record)}
    >
      Refund
    </Button>
  )
}

const useStyles = makeStyles<Theme>(() => ({
  cardHeader: {
    "& .MuiTypography-h5": {
      fontSize: "20px",
    },
  },
}))

// adminKey is the name of the property in Redux's admin store that holds the data we need to update.
// it is defined dynamically in MemberView.tsx and used by leaf components to optimistically update state
// after executing a mutation.
export const AccountView: React.FunctionComponent<MemberSubViewProps> = ({ member, adminKey, match }) => {
  const [issueRefund] = useMutation(MEMBER_INVOICE_REFUND)
  const [refundModalIsOpen, setRefundModalOpen] = useState(false)
  const classes = useStyles()

  const [invoiceToRefund, setInvoiceToRefund] = useState({
    id: "",
    amount: 0,
    amountNormalized: "",
  })

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const defaultSort = { field: "id", order: "ASC" }
  let normalizedInvoices = {}
  let invoicesIDs: string[] = []

  member?.invoices?.forEach(inv => {
    if (!inv || !inv.id || !inv.creditNotes) {
      return
    }

    // If there has been a refund, it would be in the first item of the creditNotes array.
    const firstCreditNote = inv.creditNotes[0]

    // Types for invoice are dynamically generated from Monsoon schema. Thus we create a superset
    // of the invoice object to hold our custom properties, used for rendering the invoice.
    normalizedInvoices[inv.id] = {
      ...inv,
      status: firstCreditNote?.status === STATUS_REFUNDED ? STATUS_REFUNDED : inv.status,
      tooltipText: splitTitleCase(firstCreditNote?.reasonCode),
      closingDateNormalized: moment(inv.closingDate).format("MM/DD/YYYY"),
      dueDateNormalized: moment(inv.dueDate).format("MM/DD/YYYY"),
      amountNormalized: centsToAmount(inv.amount),
    }

    invoicesIDs.push(inv.id)
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
      reasonCode: input.reasonCode.replace(/\s/g, ""),
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
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Admissions adminKey={adminKey} member={member} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Card>
            <CardHeader className={classes.cardHeader} title="Invoices" />
            <Divider />
            <Datagrid rowStyle={rowStyle} ids={invoicesIDs} data={stateInvoices} currentSort={defaultSort}>
              <TextField source="id" label="Invoice ID" />
              <TextField source="subscriptionId" label="Subscription ID" />
              <StatusField label="Status" />
              <TextField source="closingDateNormalized" label="Closing Date" />
              <TextField source="dueDateNormalized" label="Due date" />
              <TextField source="amountNormalized" label="Amount" />
              <ActionButtons label="Actions">
                <ViewButton action={handleRefundModalOpen} />
                <RefundButton action={handleRefundModalOpen} />
              </ActionButtons>
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
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
