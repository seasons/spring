import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"
import { Button, Card, Link, Table, TableBody, TableCell, TableRow, Box, Grid, Chip } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { Spacer } from "components"

export const ReservationInfo = ({ reservation, ...rest }) => {
  const { reservationNumber } = reservation

  const customer = reservation?.customer
  const { firstName, lastName } = customer?.user
  const name = `${firstName} ${lastName}`

  const { shippingLabel } = reservation?.sentPackage || {}
  const { shippingLabel: returnLabel } = reservation?.returnedPackage || {}

  const Address = ({ address: { address1, address2, city, state } }) => (
    <Box>
      <div>{address1}</div>
      <div>{address2}</div>
      <div>{city}</div>
      <div>{state}</div>
    </Box>
  )
  return (
    <>
      <Card {...rest}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/members/${customer.id}/account`}>
                  {name}
                </Link>
                <Address address={customer?.detail?.shippingAddress} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>#{reservationNumber}</TableCell>
            </TableRow>
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
              <TableCell>{DateTime.fromISO(reservation.createdAt).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Spacer mt={3} />
      <Card>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Last Location</TableCell>
              <TableCell>
                <Address address={reservation?.lastLocation} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping Label</TableCell>
              <TableCell>
                {!!shippingLabel ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      window.open(shippingLabel.image, "_blank")
                    }}
                  >
                    Print
                  </Button>
                ) : (
                  "Not Available"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Return Label</TableCell>
              <TableCell>
                {returnLabel ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      window.open(returnLabel.image, "_blank")
                    }}
                  >
                    Print
                  </Button>
                ) : (
                  "Not available"
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}