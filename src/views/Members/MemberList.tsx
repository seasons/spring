import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ActionButtons } from "fields"
import React, { useState } from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { Link as RouterLink } from "react-router-dom"
import { Box, Button, Card, Container } from "@material-ui/core"
import { MemberViewProps, ActionButtonProps } from "./interfaces"
import { MemberFilter } from "./MemberFilter"
import { MemberCreateModal } from "./MemberCreate"
import { MemberInviteModal } from "./MemberInviteModal"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"

const STATUS_WAITLISTED = "Waitlisted"

const ViewButton = (props: ActionButtonProps) => {
  const id = props.record?.user?.id
  const entityLink = `/members/${id}`
  return (
    <Button component={RouterLink} size="small" to={entityLink} variant="contained" color="secondary">
      View
    </Button>
  )
}

const InviteButton = (props: ActionButtonProps) => {
  return (
    <Box component="span" ml={2}>
      {props.record?.status === STATUS_WAITLISTED && (
        <Button size="small" variant="contained" color="secondary" onClick={() => props.actionHandler(props.record)}>
          Invite
        </Button>
      )}
    </Box>
  )
}

export const MemberList: React.FC<MemberViewProps> = ({ match, history, props }) => {
  const [openEdit, setOpenEdit] = useState(false)
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
    console.log("inviting member", member)

    setMemberToInvite({ id: "" })
    setConfirmInviteModal(false)
    toggleSnackbar({
      show: true,
      message: "Member Invited",
      status: "success",
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
        onSave={() => inviteMember(memberToInvite)}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
