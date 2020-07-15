import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"
import { Button, Card, Link, Table, TableBody, TableCell, TableRow, Box, Grid, Chip } from "@material-ui/core"
import { Indicator } from "components/Indicator"

export const ReservationInfo = ({ reservation, ...rest }) => {
  const { reservationNumber } = reservation

  const customer = reservation?.customer
  const { firstName, lastName } = customer?.user
  const name = `${firstName} ${lastName}`

  const address = customer?.detail?.shippingAddress
  const { address1, address2, city, state } = address

  const { shippingLabel } = reservation?.sentPackage || {}
  const { shippingLabel: returnLabel } = reservation?.returnedPackage || {}

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xl={3} xs={12}>
        <Card {...rest}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`/members/${customer.id}/account`}>
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
              <TableRow>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box flex={1}>Shipping Label</Box>
                    <Box>
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
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box flex={1}>Return Label</Box>
                    <Box>
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
                    </Box>
                  </Box>
                </TableCell>
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
                <TableCell>{DateTime.fromISO(reservation.createdAt).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </Grid>
  )
}
