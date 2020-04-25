import { EditButton } from "components"
import { FullNameField } from "fields"
import React from "react"

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberSubViewIfc } from "../../interfaces"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
}))

export const PaymentShipping: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()
  const billing = member.billingInfo
  const shipping = member.detail.shippingAddress

  const handleEditPayment = () => {
    console.log("editing payment")
  }

  const handleEditBillingAddress = () => {
    console.log("editing billing address")
  }

  const handleEditShippingAddress = () => {
    console.log("editing shipping address")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Payment & Shipping" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Payment</TableCell>
              <TableCell>
                {billing.brand.toUpperCase()} ending {billing.last_digits}
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditPayment} />
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Billing address</TableCell>
              <TableCell>
                <Typography component="p">{billing.name}</Typography>
                <Typography component="p">{billing.street1}</Typography>
                <Typography component="p">
                  {billing.city}, {billing.state}
                </Typography>
                <Typography component="p">{billing.postal_code}</Typography>
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditBillingAddress} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping address</TableCell>
              <TableCell>
                <Typography component="div">
                  <FullNameField record={member} />
                </Typography>
                <Typography component="p">{shipping.address1}</Typography>
                <Typography component="p">
                  {shipping.city}, {shipping.state}
                </Typography>
                <Typography component="p">{shipping.zipCode}</Typography>
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditShippingAddress} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
