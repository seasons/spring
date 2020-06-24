import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { CardContent, ComponentError, EditButton, EditModal, TableHeader } from "components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Box, Card, Table, TableBody, TableCell, TableRow, Typography, Grid } from "@material-ui/core"

import { MemberSubViewProps } from "../../interfaces"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { useMutation } from "@apollo/react-hooks"
import { ActionButtons } from "fields"

export const PaymentShipping: React.FunctionComponent<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)
  const [openEdit, setOpenEdit] = useState(false)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(MEMBER_DETAIL_UPDATE)
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
      detail: {
        update: {
          shippingAddress: {
            update: {
              name: values.shippingName.value,
              address1: values.shippingStreet1.value,
              address2: values.shippingStreet2.value,
              city: values.shippingCity.value,
              state: values.shippingState.value,
              zipCode: values.shippingPostal.value,
            },
          },
        },
      },
    }

    updateDetails({
      variables: {
        id: values.id.value,
        data: customer,
      },
    })
      .then(() => {
        const reduxUpdatePayload = {
          ...member.detail,
          shippingAddress: customer.detail.update.shippingAddress.update,
        }

        updateMember({
          ...member,
          detail: reduxUpdatePayload,
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
    shippingDivider: {
      label: "Shipping address",
    },
    shippingName: {
      value: shipping?.name,
      label: "Name",
    },
    shippingStreet1: {
      value: shipping?.address1,
      label: "Street 1",
    },
    shippingStreet2: {
      value: shipping?.address2,
      label: "Street 2",
    },
    shippingCity: {
      value: shipping?.city,
      label: "City",
    },
    shippingState: {
      value: shipping?.state,
      label: "State",
    },
    shippingPostal: {
      value: shipping?.zipCode,
      label: "Zip code",
    },
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <Grid justify="space-between" container>
                  <Grid item alignItems="center" justify="center">
                    <Box mt={0.5}>
                      <Typography variant="h4">Payment & Shipping</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <ActionButtons record={member}>
                      <EditButton onClick={handleEditOpen} />
                    </ActionButtons>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment</TableCell>
              <TableCell>
                {billing?.brand.toUpperCase()}
                {billing ? " ending " : ""}
                {billing?.last_digits}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Billing address</TableCell>
              <TableCell>
                <Typography component="p">{billing?.name}</Typography>
                <Typography component="p">{billing?.street1}</Typography>
                <Typography component="p">{billing?.street2}</Typography>
                <Typography component="p">
                  {billing?.city && billing?.state && `${billing?.city}, ${billing?.state}`}
                </Typography>
                <Typography component="p">{billing?.postal_code}</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping address</TableCell>
              <TableCell>
                <Typography component="div">
                  <Typography component="p">{shipping?.name}</Typography>
                </Typography>
                <Typography component="p">{shipping?.address1}</Typography>
                <Typography component="p">{shipping?.address2}</Typography>
                <Typography component="p">
                  {shipping?.city && shipping?.state && `${shipping?.city}, ${shipping?.state}`}
                </Typography>
                <Typography component="p">{shipping?.zipCode}</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <EditModal
        title="Shipping Address"
        editEntity={editEntity}
        onSave={handleEditSave}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  )
}
