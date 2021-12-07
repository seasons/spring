import React, { useState } from "react"
import { Datagrid, List, TextField, useRefresh } from "@seasons/react-admin"
import { Link as RouterLink } from "react-router-dom"
import { Button, Container } from "@material-ui/core"
import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ActionButtons, ResumeDateField, CheckField } from "fields"
import { MemberFilter } from "./MemberFilter"
import { MemberCreateModal } from "./MemberCreate"
import { AuthorizeMemberModal } from "./AuthorizeMemberModal"
import { MemberViewProps, ActionButtonProps } from "./interfaces"
import { AuthorizeButton } from "./AuthorizeButton"
import { ExpandedRow } from "./ExpandedRow"
import { get } from "lodash"
import { useSnackbarContext } from "components/Snackbar"

const ViewButton = (props: ActionButtonProps) => {
  const id = props.record?.id
  const entityLink = `/members/${id}/bag`
  return (
    <Button component={RouterLink} size="small" to={entityLink} variant="contained" color="primary">
      View
    </Button>
  )
}

export const MemberList: React.FC<MemberViewProps> = ({ match, history, props }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const refresh = useRefresh()

  const { showSnackbar } = useSnackbarContext()
  const onAuthorizeMemberComplete = () => {
    setMemberToInvite({ id: "" })
    setConfirmInviteModal(false)
    showSnackbar({
      message: "Member Authorized",
      status: "success",
    })
    refresh()
  }
  const onAuthorizeMemberError = error => {
    showSnackbar({
      message: `Error authorizing member: ${error?.message}`,
      status: "error",
    })
  }

  const [confirmInviteModalIsOpen, setConfirmInviteModal] = useState(false)
  const [memberToInvite, setMemberToInvite] = useState({
    id: "",
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
      <List
        {...props}
        filters={<MemberFilter />}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource="Customer"
        basePath="/members"
        sort={{ field: "id", order: "DESC" }}
      >
        <Datagrid expand={<ExpandedRow />}>
          <FullNameField label="Name" />
          <TextField source="detail.shippingAddress.city" label="City" />
          <TextField source="detail.shippingAddress.state" label="State" />
          <TextField source="admissions.authorizationsCount" label="Authorizations" />
          <CheckField
            source="admissions.admissable"
            value={true}
            label="Admissable"
            nullIf={(rec, source, value) => {
              if (get(rec, "status") === "Active") {
                console.log(get(rec, source))
              }
              return get(rec, source) == null
            }}
          />
          <StatusField label="Status" />
          <ResumeDateField label="Resume date" />
          <EntityCountField label="Current Items" entityName="bagItems" />
          <ActionButtons label="Actions">
            <ViewButton action={openConfirmInviteModal} />
            <AuthorizeButton
              action={openConfirmInviteModal}
              buttonProps={{ variant: "contained", color: "secondary" }}
            />
          </ActionButtons>
        </Datagrid>
      </List>
      <MemberCreateModal onClose={handleEditClose} open={openEdit} history={history} />
      <AuthorizeMemberModal
        member={memberToInvite}
        onClose={closeConfirmInviteModal}
        open={confirmInviteModalIsOpen}
        onCompleted={onAuthorizeMemberComplete}
        onError={onAuthorizeMemberError}
      />
    </Container>
  )
}
