import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"
import {
  Button,
  Card,
  CardActions,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Grid,
  Chip,
} from "@material-ui/core"
import { Indicator } from "components/Indicator"
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined"

const statusOptions = [
  "New",
  "In Queue",
  "On Hold",
  "Packed",
  "Shipped",
  "In Transit",
  "Received",
  "Cancelled",
  "Completed",
]

export const ReservationInfo = ({ reservation, ...rest }) => {
  const { reservationNumber } = reservation

  const customer = reservation?.customer
  const { firstName, lastName } = customer?.user
  const name = `${firstName} ${lastName}`

  const address = customer?.detail?.shippingAddress
  const { address1, address2, city, state } = address

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xl={3} xs={12}>
        <Card {...rest}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>
                  <Link component={RouterLink} to="/app/management/customers/1">
                    {name}
                  </Link>
                  <div>{address1}</div>
                  <div>{address2}</div>
                  <div>{city}</div>
                  <div>{state}</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>#{reservationNumber}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Grid>
      <Grid item md={6} xl={3} xs={12}>
        <Card {...rest}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>
                  <Chip
                    label={reservation.status}
                    icon={
                      <Box pl={1}>
                        <Indicator status={reservation.status} />
                      </Box>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>$12.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>{DateTime.fromISO(reservation.createdAt).toFormat("DD/MM/yyyy HH:MM")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </Grid>
  )
}
