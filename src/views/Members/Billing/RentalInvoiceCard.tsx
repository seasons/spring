import React from "react"
import {
  Box,
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Collapse,
} from "@material-ui/core"
import { DateTime } from "luxon"
import { formatPrice } from "utils/price"

export const RentalInvoiceCard = ({ membership, handleOpenLineItemModal }) => {
  const rentalInvoices = membership?.rentalInvoices.slice(1)
  const date = new Date()
  const formatDate = date => {
    const dateTime = DateTime.fromISO(date)
    const month = dateTime.monthShort
    const day = dateTime.day
    const time = dateTime.toLocaleString(DateTime.TIME_SIMPLE)
    return `${month} ${day}, ${time}`
  }
  return (
    <>
      <Grid justify="space-between" container>
        <Grid item alignItems="center" justify="center">
          <Box mt={0.5}>
            <Typography variant="h4">Previous Rental Invoices</Typography>
          </Box>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableCell>Status</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Billing Start</TableCell>
          <TableCell>Billing End</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {rentalInvoices &&
            rentalInvoices.map((a, id) => {
              const billingStartAt = formatDate(a.billingStartAt)
              const billingEndAt = formatDate(a.billingEndAt)
              return (
                <TableRow key={id}>
                  <TableCell>{a.status}</TableCell>
                  <TableCell>{formatPrice(a.total)}</TableCell>
                  <TableCell>{billingStartAt}</TableCell>
                  <TableCell>{billingEndAt}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => handleOpenLineItemModal("Previous rental", a?.lineItems)}
                    >
                      View line items
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </>
  )
}
