import { CardContent, EditButton, EditModal, TableHeader } from "components"
import { FullNameField } from "fields"
import React, { useState } from "react"

import { Card, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"

export const PaymentShipping: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const billing = member.billingInfo
  const shipping = member.detail.shippingAddress

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const handleEditSave = values => {
    setOpenEdit(false)
    console.log("totally gonna save these values:", values)
  }

  const editEntity = {
    id: {
      value: member.id,
    },
    number: {
      value: billing.last_digits,
    },
    expirationMonth: {
      value: billing.expiration_month,
      label: "Expiration Month",
    },
    expirationYear: {
      value: billing.expiration_year,
      label: "Expiration Year",
    },
    billingDivider: {
      label: "Billing address",
    },
    billingName: {
      value: billing.name,
      label: "Name",
    },
    billingStree1: {
      value: billing.street1,
      label: "Street",
    },
    billingCity: {
      value: billing.city,
      label: "City",
    },
    billingState: {
      value: billing.state,
      label: "State",
    },
    billingPostal: {
      value: billing.postal_code,
      label: "Zip code",
    },
    shippingDivider: {
      label: "Shipping address",
    },
    shippingName: {
      value: shipping.name,
      label: "Name",
    },
    shippingStree1: {
      value: shipping.address1,
      label: "Street",
    },
    shippingCity: {
      value: shipping.city,
      label: "City",
    },
    shippingState: {
      value: shipping.state,
      label: "State",
    },
    shippingPostal: {
      value: shipping.zipCode,
      label: "Zip code",
    },
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
                <EditButton onClick={handleEditOpen} />
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
                  <Typography component="p">{shipping.name}</Typography>
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
      <EditModal
        title="Payment & Shipping"
        editEntity={editEntity}
        onSave={handleEditSave}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  )
}
