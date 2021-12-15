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

import { DateField } from "@seasons/react-admin"
import { DateTime } from "luxon"

export const RentalInvoiceCard = ({ membership }) => {
  console.log(membership)
  const rentalInvoices = membership?.rentalInvoices.splice(1)
  console.log(rentalInvoices)
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
            <Typography variant="h4">Billed Rental Invoices</Typography>
          </Box>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableCell>Status</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Billing Start</TableCell>
          <TableCell>Billing End</TableCell>
        </TableHead>
        <TableBody>
          {rentalInvoices &&
            rentalInvoices.map((a, id) => {
              const billingStartAt = formatDate(a.billingStartAt)
              const billingEndAt = formatDate(a.billingEndAt)
              return (
                <TableRow key={id}>
                  <TableCell>{a.status}</TableCell>
                  <TableCell>{a.total ? a.total : 0}</TableCell>
                  <TableCell>{billingStartAt}</TableCell>
                  <TableCell>{billingEndAt}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </>
  )
}
