import { updateCustomer as updateCustomerAction } from "actions/customerActions"
import { ActionButtons } from "fields"
import {
  CardContent,
  ComponentError,
  EditButton,
  EditModal,
  IndicatorMap,
  Label,
  TableHeader,
  Snackbar,
} from "components"
import { SnackbarState } from "components/Snackbar"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MembershipPlanOptions, MemberStatusOptions } from "../../Member.types"
import { splitTitleCase } from "utils/strings"
import { useMutation } from "@apollo/react-hooks"
import { Button, Card, Table, TableBody, TableCell, TableRow, Box } from "@material-ui/core"

import { MemberSubViewProps, ActionButtonProps } from "../../interfaces"
import { MEMBER_DETAIL_UPDATE } from "../../queries"
import { MemberInviteModal } from "../../MemberInviteModal"

const STATUS_CREATED = "Created"

const InviteButton = (props: ActionButtonProps) => {
  return (
    <Box component="span" ml={2}>
      {props.record?.status === STATUS_CREATED && (
        <Button size="small" variant="outlined" color="primary" onClick={() => props.actionHandler(props.record)}>
          Invite
        </Button>
      )}
    </Box>
  )
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
        return <ComponentError />
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
    console.log("inviting member", member)

    setMemberToInvite({ id: "" })
    setConfirmInviteModal(false)
    toggleSnackbar({
      show: true,
      message: "Member Invited",
      status: "success",
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
              <TableHeader>Personal details</TableHeader>
              <TableCell></TableCell>
              <TableCell>
                <Box display="flex" alignItems="flex-end">
                  <ActionButtons record={member}>
                    <EditButton onClick={handleEditOpen} />
                    <InviteButton actionHandler={openConfirmInviteModal} />
                  </ActionButtons>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow selected>
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
              <TableCell>{splitTitleCase(member.plan)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Email</TableCell>
              <TableCell>{member.user.email}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Phone number</TableCell>
              <TableCell>{member.detail.phoneNumber}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Birthday</TableCell>
              <TableCell>{birthday}</TableCell>
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
