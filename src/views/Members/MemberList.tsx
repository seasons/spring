import React, { useState } from "react"
import { Datagrid, List, TextField, useRefresh } from "@seasons/react-admin"
import { Link as RouterLink } from "react-router-dom"
import { Box, Button, Card, Container } from "@material-ui/core"
import { useMutation } from "@apollo/react-hooks"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ActionButtons } from "fields"
import { MemberFilter } from "./MemberFilter"
import { MemberCreateModal } from "./MemberCreate"
import { MemberInviteModal } from "./MemberInviteModal"
import { MemberViewProps, ActionButtonProps } from "./interfaces"
import { MEMBER_DETAIL_UPDATE } from "./queries"
import { updateCustomerVariables } from "generated/updateCustomer"
import { CustomerStatus } from "generated/globalTypes"

const ViewButton = (props: ActionButtonProps) => {
  const id = props.record?.id
  const entityLink = `/members/${id}/account`
  return (
    <Button component={RouterLink} size="small" to={entityLink} variant="contained" color="secondary">
      View
    </Button>
  )
}

const InviteButton = (props: ActionButtonProps) => {
  return (
    <Box component="span" ml={2}>
      {props.record?.status === CustomerStatus.Waitlisted && (
        <Button size="small" variant="contained" color="secondary" onClick={() => props.actionHandler(props.record)}>
          Invite
        </Button>
      )}
    </Box>
  )
}

const inviteModalBody = "This will send the member an email and update their status."

export const MemberList: React.FC<MemberViewProps> = ({ match, history, props }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const refresh = useRefresh()

  const [updateDetails] = useMutation<any, updateCustomerVariables>(MEMBER_DETAIL_UPDATE, {
    onCompleted: () => {
      setMemberToInvite({ id: "" })
      setConfirmInviteModal(false)
      toggleSnackbar({
        show: true,
        message: "Member Invited",
        status: "success",
      })
      refresh()
    },
    onError: () => {
      toggleSnackbar({
        show: true,
        message: "Error inviting member",
        status: "error",
      })
    },
  })

  const [confirmInviteModalIsOpen, setConfirmInviteModal] = useState(false)
  const [memberToInvite, setMemberToInvite] = useState({
    id: "",
  })

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const openNewMemberModal = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
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
  }

  return (
    <Container maxWidth={false}>
      <Header
        title="Members"
        primaryButton={{ text: "Create Member", action: openNewMemberModal }}
        breadcrumbs={[
          {
            title: "Members",
            url: "/members",
          },
        ]}
      />
      <Card>
        <List
          {...props}
          filters={<MemberFilter />}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          component="div"
          resource="Customer"
          basePath="/members"
          sort={{ field: "id", order: "DESC" }}
        >
          <Datagrid>
            <FullNameField label="Name" />
            <TextField source="detail.shippingAddress.city" label="City" />
            <TextField source="detail.shippingAddress.state" label="State" />
            <TextField source="plan" label="Membership" />
            <StatusField label="Status" />
            <TextField source="bagItems.id" label="Money Spent" />
            <EntityCountField label="Current Items" entityName="bagItems" />
            <ActionButtons label="Actions">
              <ViewButton actionHandler={openConfirmInviteModal} />
              <InviteButton actionHandler={openConfirmInviteModal} />
            </ActionButtons>
          </Datagrid>
        </List>
      </Card>
      <MemberCreateModal onClose={handleEditClose} open={openEdit} history={history} />
      <MemberInviteModal
        title="Confirm Invite"
        body={inviteModalBody}
        onSave={() => inviteMember(memberToInvite)}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
