import { CardContent, EditButton, TableHeader } from "components"
import { FullNameField } from "fields"
import React from "react"

import { Card, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"

export const PaymentShipping: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const billing = member.billingInfo
  const shipping = member.detail.shippingAddress

  const handleEdit = () => {
    console.log("editing payment")
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Payment & Shipping</TableHeader>
              <TableCell></TableCell>
              <TableCell>
                <EditButton onClick={handleEdit} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment</TableCell>
              <TableCell>
                {billing.brand.toUpperCase()} ending {billing.last_digits}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Billing address</TableCell>
              <TableCell>
                <Typography component="p">{billing.name}</Typography>
                <Typography component="p">{billing.street1}</Typography>
                <Typography component="p">
                  {billing.city}, {billing.state}
                </Typography>
                <Typography component="p">{billing.postal_code}</Typography>
              </TableCell>
              <TableCell></TableCell>
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
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
