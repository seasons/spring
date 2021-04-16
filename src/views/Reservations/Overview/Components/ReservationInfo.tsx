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

  const Address = ({ address }) => {
    if (!address) {
      return <>Not Available</>
    }
    const { address1, address2, city, state } = address
    return (
      <Box>
        <div>{address1}</div>
        <div>{address2}</div>
        <div>{city}</div>
        <div>{state}</div>
      </Box>
    )
  }

  const billingStatus = customer?.status === "PaymentFailed" ? "Delinquent" : "Paid"
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
              <TableCell>Billing Status</TableCell>
              <TableCell>
                <Chip
                  label={billingStatus}
                  icon={
                    <Box pl={1}>
                      <Indicator status={billingStatus} />
                    </Box>
                  }
                />
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
              <TableCell>Reservations</TableCell>
              <TableCell>{reservation?.customer?.reservations.length}</TableCell>
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
            <TableRow>
              <TableCell>Sent Package</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => {
                    window.open(reservation?.sentPackage?.shippingLabel?.trackingURL, "_blank")
                  }}
                >
                  Track
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Return Package</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => {
                    window.open(reservation?.returnedPackage?.shippingLabel?.trackingURL, "_blank")
                  }}
                >
                  Track
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
