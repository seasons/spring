import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { ActionButtons } from "fields"
import { CardContent, EditButton, EditModal, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MembershipPlanOptions, MemberStatusOptions } from "../../Member.types"
import { splitTitleCase } from "utils/strings"
import { copyToClipboard } from "utils/copyToClipboard"
import { useMutation } from "@apollo/react-hooks"
import { Button, Card, Table, TableBody, TableCell, TableRow, Box, Grid, Typography, Chip } from "@material-ui/core"
import { CustomerStatus } from "generated/globalTypes"
import { MemberSubViewProps } from "../../interfaces"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { AuthorizeMemberModal } from "../../AuthorizeMemberModal"
import { Indicator } from "components/Indicator"
import { AuthorizeButton } from "views/Members/AuthorizeButton"
export const PersonalDetails: React.FunctionComponent<MemberSubViewProps> = ({ adminKey }) => {
  const adminStoreKey = adminKey || ""
  const memberFromStore = useSelector(state => state.admin.customQueries[adminStoreKey].data)

  const [openEdit, setOpenEdit] = useState(false)
  const [member, updateMember] = useState(memberFromStore)
  const [updateDetails] = useMutation(MEMBER_DETAIL_UPDATE)
  const [confirmInviteModalIsOpen, setConfirmInviteModal] = useState(false)
  const [memberToInvite, setMemberToInvite] = useState({
    id: "",
  })

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
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
    })
      .then(() => {
        // (1) update state so card reflects latest data optimistically
        updateMember(memberData)
      })
      .catch(error => {
        toggleSnackbar({
          show: true,
          message: "Error updating member",
          status: "error",
        })
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
    toggleSnackbar({
      show: true,
      message: "Member Authorized",
      status: "success",
    })
  }
  const onAuthorizeMemberError = error => {
    toggleSnackbar({
      show: true,
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

  const resumeDate = member?.membership?.pauseRequests?.[0]?.resumeDate
  const pauseDate = member?.membership?.pauseRequests?.[0]?.pauseDate

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
                      <AuthorizeButton action={openConfirmInviteModal} />
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
              <TableCell></TableCell>
            </TableRow>

            {!!resumeDate && member.status === "Paused" && (
              <TableRow>
                <TableCell>Resume date</TableCell>
                <TableCell>{moment(resumeDate).format("MM/DD/YYYY")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            {!!pauseDate && member.status === "Paused" && (
              <TableRow>
                <TableCell>Pause date</TableCell>
                <TableCell>{moment(pauseDate).format("MM/DD/YYYY")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Membership</TableCell>
              <TableCell>{splitTitleCase(member.plan)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{member.user.email}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone number</TableCell>
              <TableCell>{member.detail.phoneNumber}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{birthday}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Complete Account Link</TableCell>
              <TableCell>
                <Box>
                  <Button variant="outlined" onClick={() => copyToClipboard(member.user.completeAccountURL)}>
                    Copy
                  </Button>
                </Box>
              </TableCell>
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
      <AuthorizeMemberModal
        member={memberToInvite}
        onCompleted={onAuthorizeMemberComplete}
        onError={onAuthorizeMemberError}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Card>
  )
}
