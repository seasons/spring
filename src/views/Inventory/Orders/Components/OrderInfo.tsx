import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"
import { Button, Card, Link, Table, TableBody, TableCell, TableRow, Typography, Box, Chip } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { Spacer } from "components"
import { formatPrice } from "utils/price"

export const OrderInfo = ({ order, ...rest }) => {
  const { orderNumber } = order

  const customer = order?.customer
  const email = customer?.user?.email
  const fullName = customer?.user?.fullName

  const { shippingLabel } = order?.sentPackage || {}

  console.log("fullName", fullName)
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
  return (
    <>
      <Card {...rest} style={{ overflow: "scroll" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Customer name</TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/members/${customer.id}/bag`}>
                  {!!fullName?.includes("null") ? "Guest customer" : fullName}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>#{orderNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping Address</TableCell>
              <TableCell>
                <Address address={customer?.detail?.shippingAddress} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  icon={
                    <Box pl={1}>
                      <Indicator status={order.status} />
                    </Box>
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{order.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>{DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                <Typography variant="h4">{formatPrice(order.total)}</Typography>
              </TableCell>
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
                <Address address={order?.lastLocation} />
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
              <TableCell>Sent Package</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => {
                    window.open(order?.sentPackage?.shippingLabel?.trackingURL, "_blank")
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
