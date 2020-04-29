import { CardContent, EditButton, EditModal, TableHeader } from "components"
import React, { useState } from "react"

import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"

export const Sizing: React.FC<MemberSubViewIfc> = ({ member }) => {
  const user = member.detail
  const [openEdit, setOpenEdit] = useState(false)

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const handleEditSave = values => {
    setOpenEdit(false)
    console.log("totally gonna save these values:", values)
    // updateDetails({ variables: { details: { id: values.id }, status: "Suspended" } })
  }

  const editEntity = {
    id: {
      value: member.id,
    },
    height: {
      value: user.height,
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
    },
    averagePantLength: {
      value: user.averagePantLength,
      label: "Average Pant Length",
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
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{user.height}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body Type</TableCell>
              <TableCell>{user.bodyType}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. top size</TableCell>
              <TableCell>{user.averageTopSize}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. waist size</TableCell>
              <TableCell>{user.averageWaistSize}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
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
