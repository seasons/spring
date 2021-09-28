import { useMutation } from "@apollo/react-hooks"
import { Box, Card, Chip, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"
import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { CardContent, EditButton, EditModal } from "components"
import { Indicator } from "components/Indicator"
import { useSnackbarContext } from "components/Snackbar"
import { ActionButtons } from "fields"
import { CustomerStatus } from "generated/globalTypes"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { splitTitleCase } from "utils/strings"
import { AuthorizeButton } from "views/Members/AuthorizeButton"
import { AuthorizeMemberModal } from "../../AuthorizeMemberModal"
import { MemberSubViewProps } from "../../interfaces"
import { MembershipPlanOptions, MemberStatusOptions } from "../../Member.types"
import { MEMBER_DETAIL_UPDATE_WITHOUT_CONTACT } from "../../queries"

export const PersonalDetails: React.FunctionComponent<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)

  const { showSnackbar } = useSnackbarContext()
  const [openEdit, setOpenEdit] = useState(false)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(MEMBER_DETAIL_UPDATE_WITHOUT_CONTACT, {
    onError: error => {
      showSnackbar({
        message: "Error updating member",
        status: "error",
      })
    },
    onCompleted: data => {
      showSnackbar({ message: "Updated Member", status: "error" })
    },
  })
  const [confirmInviteModalIsOpen, setConfirmInviteModal] = useState(false)
  const [memberToInvite, setMemberToInvite] = useState({
    id: "",
  })

  const dispatch = useDispatch()

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const handleEditSave = values => {
    setOpenEdit(false)
    const status = values.status.value

    const customer = {
      status,
    } as any

    const memberData = {
      ...member,
      status,
    }

    if (!!values.plan.value) {
      const plan = values.plan.value.replace(/\s/g, "")
      memberData.plan = plan
      customer.plan = plan
    }

    updateDetails({
      variables: {
        id: values.id.value,
        data: customer,
      },
    }).then(() => {
      // (1) update state so card reflects latest data optimistically
      updateMember(memberData)
    })
  }

  const openConfirmInviteModal = id => {
    setMemberToInvite(id)
    setConfirmInviteModal(true)
  }

  const closeConfirmInviteModal = () => {
    setConfirmInviteModal(false)
  }

  const onAuthorizeMemberComplete = () => {
    // (1) update state so card reflects latest data optimistically
    updateMember({
      ...member,
      status: CustomerStatus.Authorized,
    })

    setMemberToInvite({ id: "" })
    setConfirmInviteModal(false)
    showSnackbar({
      message: "Member Authorized",
      status: "success",
    })
  }
  const onAuthorizeMemberError = error => {
    showSnackbar({
      message: `Error authorizing member: ${error?.message}`,
      status: "error",
    })
  }

  // (2) update Redux store optimistically to
  // --- (a) avoid refetching from server and
  // --- (b) ensure latest data shows up when navigating back to this tab
  useEffect(() => {
    dispatch(updateCustomerAction(member))
  }, [member, dispatch])

  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")
  const plan = member.membership?.plan

  const editEntity = {
    id: {
      value: member.id,
    },
    status: {
      value: member.status,
      options: MemberStatusOptions,
    },
    plan: {
      value: splitTitleCase(member.plan),
      options: [...MembershipPlanOptions, ""],
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
              <TableCell colSpan={3}>
                <Grid justify="space-between" container>
                  <Grid item alignItems="center" justify="center">
                    <Box mt={0.5}>
                      <Typography variant="h4">Personal Details</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <ActionButtons record={member}>
                      <EditButton onClick={handleEditOpen} />
                      <AuthorizeButton
                        action={openConfirmInviteModal}
                        buttonProps={{ variant: "contained", color: "secondary" }}
                      />
                    </ActionButtons>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Chip
                  label={member.status}
                  icon={
                    <Box pl={1}>
                      <Indicator status={member.status} />
                    </Box>
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Membership</TableCell>
              <TableCell>{splitTitleCase(plan?.name)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{member.user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone number</TableCell>
              <TableCell>{member.detail.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{birthday}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Instagram Handle</TableCell>
              <TableCell>{member.detail.instagramHandle ?? "n/a"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discovery Reference</TableCell>
              <TableCell>{member.detail.discoveryReference ?? "n/a"}</TableCell>
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
      <AuthorizeMemberModal
        member={memberToInvite}
        onCompleted={onAuthorizeMemberComplete}
        onError={onAuthorizeMemberError}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
      />
    </Card>
  )
}
