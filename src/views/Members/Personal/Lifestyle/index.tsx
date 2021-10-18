import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { useMutation } from "@apollo/react-hooks"
import { CardContent, ComponentError, EditButton, EditModal, TableHeader } from "components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core"

import { MemberSubViewProps } from "../../interfaces"

export const Lifestyle: React.FC<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  // @ts-ignore
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(MEMBER_DETAIL_UPDATE)
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
          preferredPronouns: values.preferredPronouns.value,
          profession: values.profession.value,
          partyFrequency: values.partyFrequency.value,
          averageSpend: values.averageSpend.value,
          style: values.style.value,
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
            <TableRow selected>
              <TableCell>Preferred Pronouns</TableCell>
              <TableCell>{user.preferredPronouns}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Profession</TableCell>
              <TableCell>{user.profession}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Party Frequency</TableCell>
              <TableCell>{user.partyFrequency}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Average Spend</TableCell>
              <TableCell>{user.averageSpend}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
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
