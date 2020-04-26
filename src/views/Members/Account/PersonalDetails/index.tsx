import { CardContent, EditButton, IndicatorMap, Label, TableHeader } from "components"
import moment from "moment"
import React, { useState } from "react"

import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"
import { EditModal } from "./EditModal"

export const PersonalDetails: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
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
      <EditModal member={member} onClose={handleEditClose} open={openEdit} />
    </Card>
  )
}
