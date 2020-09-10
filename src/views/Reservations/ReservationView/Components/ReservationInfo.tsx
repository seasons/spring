import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"
import { Button, Card, Link, Table, TableBody, TableCell, TableRow, Box, Grid, Chip, colors } from "@material-ui/core"
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
  // Making changes to track reservation
  let step
  let trackingURL
  let statusTxt = ""
  const statCheck = reservation.status
  const sentPackageTrackingURL = reservation?.sentPackage?.shippingLabel?.trackingURL
  const returnedPackageTrackingURL = reservation?.returnedPackage?.shippingLabel?.trackingURL

  if (reservation.phase === "CustomerToBusiness") {
    // This is for when the package is going back to the warehouse
    trackingURL = returnedPackageTrackingURL
    if (statCheck === "Delivered") {
      statusTxt = "Returned"
      step = 3
    } else if (statCheck === "Shipped") {
      statusTxt = "In-Transit"
      step = 2
    } else if (statCheck) {
      statusTxt = "Recieved by UPS"
      step = 1
    } else {
      return null
    }
  } else {
    // This is for when the pacakage is being sent to the customer
    trackingURL = sentPackageTrackingURL
    if (statCheck === "Delivered") {
      statusTxt = "Delivered"
      step = 3
    } else if (statCheck === "Shipped") {
      statusTxt = "Shipped"
      step = 2
    } else if (statCheck === "Packed") {
      statusTxt = "Order being prepared"
      step = 1
    } else if (statCheck === "Queued") {
      statusTxt = "Order received"
      step = 0
    } else {
      return null
    }
  }

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
              <TableCell></TableCell>
              <TableCell></TableCell>
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
