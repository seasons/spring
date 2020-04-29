import { CardContent, EditButton, IndicatorMap, Label, TableHeader } from "components"
import moment from "moment"
import React, { useState } from "react"

import { useMutation } from "@apollo/react-hooks"
import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"
import { EditModal } from "./EditModal"
import { CUSTOMER_DETAIL_UPDATE } from "./mutations"

export const PersonalDetails: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")
  const [updateDetails, { data }] = useMutation(CUSTOMER_DETAIL_UPDATE)

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const statusValues = [
    "Invited",
    "Created",
    "Waitlisted",
    "Authorized",
    "Active",
    "Suspended",
    "Paused",
    "Deactivated",
  ]

  const handleEditSave = values => {
    setOpenEdit(false)
    console.log("totally gonna save these values:", values)
    // updateDetails({ variables: { details: { id: values.id }, status: "Suspended" } })
  }

  const editEntity = {
    id: member.id,
    status: member.status,
    plan: member.plan,
    email: member.user.email,
    phone: member.detail.phoneNumber,
    birthday: moment(member.detail.birthday).format("YYYY-MM-DD"),
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
      <EditModal editEntity={editEntity} onSave={handleEditSave} onClose={handleEditClose} open={openEdit} />
    </Card>
  )
}
