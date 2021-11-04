import React, { useState } from "react"
import { DateTime } from "luxon"
import { Header as BaseHeader, ConfirmationDialog } from "components"
import { MemberSubViewProps } from "./interfaces"
import { AssignRolesModal } from "./AssignRolesModal"
import { useMutation } from "@apollo/react-hooks"
import { MEMBER_ASSIGN_ROLE } from "./queries"
import gql from "graphql-tag"
import { useSnackbarContext } from "components/Snackbar"
import { Box, Button, IconButton, styled } from "@material-ui/core"
import { colors } from "theme"
import { LostItemModal } from "./LostItemModal"

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

const CANCEL_CUSTOMER = gql`
  mutation CancelCustomer($customerId: ID!) {
    cancelCustomer(customerId: $customerId)
  }
`

export const Header: React.FunctionComponent<MemberSubViewProps> = ({ member }) => {
  console.log(member)
  const [showResetPasswordConfirmation, setShowResetPasswordConfirmation] = useState(false)
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [openLostItemModal, setOpenLostItemModal] = useState(false)
  const { showSnackbar } = useSnackbarContext()
  const [assignMemberRoles] = useMutation<any, any>(MEMBER_ASSIGN_ROLE, {
    onCompleted: () => {
      closeAssignRolesModal()
      showSnackbar({
        message: "Member roles updated",
        status: "success",
      })
    },
    onError: () => {
      closeAssignRolesModal()
      showSnackbar({
        message: "Error updating member roles",
        status: "error",
      })
    },
  })

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      showSnackbar({
        message: "Reset password email sent to user",
        status: "success",
      })
    },
    onError: () => {
      showSnackbar({
        message: "Error sending reset password email",
        status: "error",
      })
    },
  })

  const [cancelCustomer] = useMutation(CANCEL_CUSTOMER, {
    onCompleted: () => {
      showSnackbar({
        message: "Customer Cancelled",
        status: "success",
      })
    },
    onError: err => {
      showSnackbar({
        message: err.message,
        status: "error",
      })
    },
  })

  const [assignRolesModalIsOpen, setAssignRolesModal] = useState(false)

  const openAssignRolesModal = () => {
    setAssignRolesModal(true)
  }

  const closeAssignRolesModal = () => {
    setAssignRolesModal(false)
  }

  const assignRolesToMember = (email, newRoles) => {
    assignMemberRoles({
      variables: {
        email: email,
        data: { roles: { set: newRoles } },
      },
    })
  }

  const memberSince = DateTime.fromISO(member.user.createdAt).toLocaleString(DateTime.DATE_MED)
  const user = member.user
  const fullName = `${user.firstName} ${user.lastName}`

  const onCloseResetPasswordConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    await resetPassword({
      variables: {
        email: member.user.email,
      },
    })
  }

  const onCloseCancelConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    await cancelCustomer({
      variables: {
        customerId: member.id,
      },
    })
  }

  return (
    <>
      <BaseHeader
        title={fullName}
        subtitle={`Joined ${memberSince}`}
        breadcrumbs={[
          {
            title: "Members",
            url: "/members",
          },
          {
            title: `Member: ${fullName}`,
            url: `/members/${member.id}/bag`,
          },
        ]}
        menuItems={[
          {
            text: "Send reset password",
            action: () => setShowResetPasswordConfirmation(true),
          },
          {
            text: "Assign roles",
            action: openAssignRolesModal,
          },
          { text: "Cancel Customer", action: () => setShowCancelConfirmation(true) },
        ]}
      />
      <Box display="flex" justifyContent="right">
        <BorderedButton onClick={() => setOpenLostItemModal(true)}>Process Lost Item(s)</BorderedButton>
      </Box>

      <AssignRolesModal
        title="Assign roles to member"
        member={member}
        onSave={assignRolesToMember}
        onClose={closeAssignRolesModal}
        open={assignRolesModalIsOpen}
      />
      <ConfirmationDialog
        title="Are you sure you want to send a reset password email?"
        body="This user will receive an email with a reset password link."
        open={showResetPasswordConfirmation}
        setOpen={setShowResetPasswordConfirmation}
        onClose={onCloseResetPasswordConfirmationDialog}
      />
      <ConfirmationDialog
        title="Are you sure you want to cancel the customer?"
        body="This will bill any outstanding charges, cancel their subscription, and mark them as deactivated."
        open={showCancelConfirmation}
        setOpen={setShowCancelConfirmation}
        onClose={onCloseCancelConfirmationDialog}
      />
      <LostItemModal open={openLostItemModal} onClose={() => setOpenLostItemModal(false)} bagItems={member.bagItems} />
    </>
  )
}

const BorderedButton = styled(Button)({
  border: `1px solid ${colors.grey[300]}`,
  borderRadius: `8px`,
  padding: "12px 24px",
})
