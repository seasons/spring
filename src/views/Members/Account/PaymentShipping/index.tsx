import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { CardContent, ComponentError, EditButton, EditModal, TableHeader } from "components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"
import { CUSTOMER_DETAIL_UPDATE } from "../../queries"
import { useMutation } from "@apollo/react-hooks"

export const PaymentShipping: React.FunctionComponent<MemberSubViewIfc> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)
  const [openEdit, setOpenEdit] = useState(false)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(CUSTOMER_DETAIL_UPDATE)
  const dispatch = useDispatch()
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
    const customer = {
      billingInfo: {
        update: {
          brand: billing.brand,
          name: values.billingName.value,
          last_digits: billing.last_digits,
          expiration_month: billing.expiration_month,
          expiration_year: billing.expiration_year,
          street1: values.billingStreet1.value,
          city: values.billingCity.value,
          state: values.billingState.value,
          postal_code: values.billingPostal.value,
        },
      },
      detail: {
        update: {
          ...member.detail,
          shippingAddress: {
            update: {
              name: values.shippingName.value,
              address1: values.shippingStreet1.value,
              city: values.shippingCity.value,
              state: values.shippingState.value,
              zipCode: values.shippingPostal.value,
            },
          },
        },
      },
    }

    // remove properties not expected by mutation input type
    delete customer.detail.update.__typename
    delete customer.detail.update.id

    updateDetails({
      variables: {
        id: values.id.value,
        data: customer,
      },
    })
      .then(() => {
        customer.detail.update.shippingAddress = customer.detail.update.shippingAddress.update
        updateMember({
          ...member,
          billingInfo: customer.billingInfo.update,
          detail: customer.detail.update,
        })
      })
      .catch(error => {
        return <ComponentError />
      })
  }

  useEffect(() => {
    dispatch(updateCustomerAction(member))
  }, [member, dispatch])

  const editEntity = {
    id: {
      value: member.id,
    },
    number: {
      value: billing.last_digits,
      disabled: true,
    },
    expirationMonth: {
      value: billing.expiration_month,
      label: "Expiration Month",
      disabled: true,
    },
    expirationYear: {
      value: billing.expiration_year,
      label: "Expiration Year",
      disabled: true,
    },
    billingDivider: {
      label: "Billing address",
    },
    billingName: {
      value: billing.name,
      label: "Name",
    },
    billingStreet1: {
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
    shippingStreet1: {
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
