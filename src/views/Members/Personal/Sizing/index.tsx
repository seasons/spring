import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { CUSTOMER_DETAIL_UPDATE } from "../../queries"
import { useMutation } from "@apollo/react-hooks"
import { CardContent, ComponentError, EditButton, EditModal, TableHeader } from "components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewProps } from "../../interfaces"

export const Sizing: React.FC<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(CUSTOMER_DETAIL_UPDATE)
  const [openEdit, setOpenEdit] = useState(false)
  const dispatch = useDispatch()
  const user = member.detail

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
          height: parseInt(values.height.value, 10),
          bodyType: values.bodyType.value,
          averageTopSize: values.averageTopSize.value,
          averageWaistSize: values.averageWaistSize.value,
          averagePantLength: values.averagePantLength.value,
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
          ...customer.detail.update,
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
    height: {
      value: user.height,
      type: "number",
    },
    bodyType: {
      value: user.bodyType,
      label: "Body Type",
    },
    averageTopSize: {
      value: user.averageTopSize,
      label: "Average Top Size",
    },
    averageWaistSize: {
      value: user.averageWaistSize,
      label: "Average Waist Size",
      type: "number",
    },
    averagePantLength: {
      value: user.averagePantLength,
      label: "Average Pant Length",
      type: "number",
    },
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Sizing</TableHeader>
              <TableCell></TableCell>
              <TableCell>
                <EditButton onClick={handleEditOpen} />
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Height</TableCell>
              <TableCell>{user.height}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Body Type</TableCell>
              <TableCell>{user.bodyType}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Avg. top size</TableCell>
              <TableCell>{user.averageTopSize}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Avg. waist size</TableCell>
              <TableCell>{user.averageWaistSize}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Avg. pant length</TableCell>
              <TableCell>{user.averagePantLength}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <EditModal
        title="Sizing"
        editEntity={editEntity}
        onSave={handleEditSave}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  )
}
