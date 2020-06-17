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
import { MemberSubViewProps, ActionButtonProps } from "../../interfaces"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { MemberInviteModal } from "../../MemberInviteModal"
import { Indicator } from "components/Indicator"

const InviteButton: React.FC<ActionButtonProps> = props => {
  if (props.record?.status === CustomerStatus.Created) {
    return (
      <Box component="span" ml={2}>
        <Button size="small" variant="outlined" color="primary" onClick={() => props.action(props.record)}>
          Invite
        </Button>
      </Box>
    )
  }
  return null
}

const inviteModalBody = "This will send the member an email to reset their password."

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

    const customer = {
      status: values.status.value,
      plan: values.plan.value.replace(/\s/g, ""),
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

  const inviteMember = member => {
    updateDetails({
      variables: {
        id: member.id,
        data: { status: CustomerStatus.Invited },
      },
    })
      .then(() => {
        // (1) update state so card reflects latest data optimistically
        updateMember({
          ...member,
          status: CustomerStatus.Invited,
        })

        setMemberToInvite({ id: "" })
        setConfirmInviteModal(false)
        toggleSnackbar({
          show: true,
          message: "Member Invited",
          status: "success",
        })
      })
      .catch(error => {
        toggleSnackbar({
          show: true,
          message: "Error inviting member",
          status: "error",
        })
      })
  }

  // (2) update Redux store optimistically to
  // --- (a) avoid refetching from server and
  // --- (b) ensure latest data shows up when navigating back to this tab
  useEffect(() => {
    dispatch(updateCustomerAction(member))
  }, [member, dispatch])

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
      value: splitTitleCase(member.plan),
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
                      <InviteButton action={openConfirmInviteModal} />
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
      <MemberInviteModal
        title="Confirm Invite"
        body={inviteModalBody}
        onSave={() => inviteMember(memberToInvite)}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Card>
  )
}
