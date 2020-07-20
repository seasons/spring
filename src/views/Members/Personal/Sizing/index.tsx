import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { useMutation } from "@apollo/react-hooks"
import { CardContent, ComponentError, EditButton, EditModal, TableHeader } from "components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, Table, TableBody, TableCell, TableRow, Grid, Box, Typography } from "@material-ui/core"

import { MemberSubViewProps } from "../../interfaces"

export const Sizing: React.FC<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
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
          height: parseInt(values.height.value, 10),
          bodyType: values.bodyType.value,
          topSizes: values.topSizes.value,
          waistSizes: values.waistSizes.value,
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
    topSizes: {
      value: user.topSizes,
      label: "Preferred Top Sizes",
    },
    waistSizes: {
      value: user.waistSizes,
      label: "Preferred Waist Sizes",
      type: "number",
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
                      <Typography variant="h4">Sizing</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <EditButton onClick={() => alert("Need to implement")} />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <SizeTableRow
              fieldName="Height"
              fieldValue={user.height}
              formatFunc={a => {
                const feet = Math.floor(a / 12)
                const inches = a - 12 * feet
                return `${feet}'${inches}"`
              }}
            />
            <SizeTableRow fieldName="Body Type" fieldValue={user.bodyType} />
            <SizeTableRow fieldName="Preferred Top Sizes" fieldValue={`${user.topSizes}`} />
            <SizeTableRow fieldName="Preferred Waist Sizes" fieldValue={`${user.waistSizes}`} />
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

const SizeTableRow = ({ fieldName, fieldValue, formatFunc = a => a }) => {
  return (
    <TableRow>
      <TableCell>{fieldName}</TableCell>
      <TableCell>{formatFunc(fieldValue) || "n/a"}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
