import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { CardContent, ComponentError, EditButton, EditModal, IndicatorMap, Label, TableHeader } from "components"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MembershipPlanOptions, MemberStatusOptions } from "utils/constants"

import { useMutation } from "@apollo/react-hooks"
import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"
import { CUSTOMER_DETAIL_UPDATE } from "../../queries"

export const PersonalDetails: React.FunctionComponent<MemberSubViewIfc> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)

  const [openEdit, setOpenEdit] = useState(false)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(CUSTOMER_DETAIL_UPDATE)
  const dispatch = useDispatch()

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const handleEditSave = values => {
    setOpenEdit(false)

    const customer = {
      status: values.status.value,
      plan: values.plan.value,
    }

    updateDetails({
      variables: {
        id: values.id.value,
        data: customer,
      },
    })
      .then(() => {
        // (1) update state so card reflects latest data optimistically
        updateMember({
          ...member,
          status: customer.status,
          plan: customer.plan,
        })
      })
      .catch(error => {
        return <ComponentError />
      })
  }

  // (2) update Redux store optimistically to
  // --- (a) avoid refetching from server and
  // --- (b) ensure latest data shows up when navigating back to this tab
  useEffect(() => {
    dispatch(updateCustomerAction(member))
  }, [member])

  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")

  const editEntity = {
    id: {
      value: member.id,
    },
    status: {
      value: member.status,
      options: MemberStatusOptions,
    },
    plan: {
      value: member.plan,
      options: MembershipPlanOptions,
    },
    email: {
      value: member.user.email,
      disabled: true,
    },
    phone: {
      value: member.detail.phoneNumber,
      disabled: true,
    },
    birthday: {
      value: moment(member.detail.birthday).format("YYYY-MM-DD"),
      disabled: true,
    },
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Personal details</TableHeader>
              <TableCell></TableCell>
              <TableCell>
                <EditButton onClick={handleEditOpen} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Label shape="rounded" color={IndicatorMap[member.status]}>
                  {member.status}
                </Label>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Membership</TableCell>
              <TableCell>{member.plan}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{member.user.email}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Phone number</TableCell>
              <TableCell>{member.detail.phoneNumber}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{birthday}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <EditModal
        title="Personal Details"
        editEntity={editEntity}
        onSave={handleEditSave}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  )
}
