import { CardContent, EditButton, EditModal, TableHeader } from "components"
import React, { useState } from "react"

import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewIfc } from "../../interfaces"

export const Lifestyle: React.FC<MemberSubViewIfc> = ({ member }) => {
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
    preferredPronouns: {
      value: user.preferredPronouns,
      label: "Preferred Pronouns",
    },
    profession: {
      value: user.profession,
    },
    partyFrequency: {
      value: user.partyFrequency,
      label: "Party Frequency",
    },
    averageSpend: {
      value: user.averageSpend,
      label: "Average Spend",
    },
    style: {
      value: user.style,
      label: "Style Preferences",
    },
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Lifestyle</TableHeader>
              <TableCell></TableCell>
              <TableCell>
                <EditButton onClick={handleEditOpen} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Preferred Pronouns</TableCell>
              <TableCell>{user.preferredPronouns}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profession</TableCell>
              <TableCell>{user.profession}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Party Frequency</TableCell>
              <TableCell>{user.partyFrequency}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Spend</TableCell>
              <TableCell>{user.averageSpend}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Style Preferences</TableCell>
              <TableCell>{user.style}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <EditModal
        title="Lifestyle"
        editEntity={editEntity}
        onSave={handleEditSave}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  )
}
