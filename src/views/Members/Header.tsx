import React, { useState } from "react"
import { DateTime } from "luxon"
import { Header as BaseHeader, ConfirmationDialog } from "components"
import { MemberViewHeaderProps } from "./interfaces"
import { AssignRolesModal } from "./AssignRolesModal"
import { useMutation } from "@apollo/react-hooks"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { MEMBER_ASSIGN_ROLE } from "./queries"
import gql from "graphql-tag"

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

export const Header: React.FunctionComponent<MemberViewHeaderProps> = ({ history, member }) => {
  const [showResetPasswordConfirmation, setShowResetPasswordConfirmation] = useState(false)
  const [assignMemberRoles] = useMutation<any, any>(MEMBER_ASSIGN_ROLE, {
    onCompleted: () => {
      closeAssignRolesModal()
      toggleSnackbar({
        show: true,
        message: "Member roles updated",
        status: "success",
      })
    },
    onError: () => {
      closeAssignRolesModal()
      toggleSnackbar({
        show: true,
        message: "Error updating member roles",
        status: "error",
      })
    },
  })

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Reset password email sent to user",
        status: "success",
      })
    },
    onError: () => {
      toggleSnackbar({
        show: true,
        message: "Error sending reset password email",
        status: "error",
      })
    },
  })

  const [assignRolesModalIsOpen, setAssignRolesModal] = useState(false)
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

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
            url: `/members/${member.id}/account`,
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
        ]}
      />
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
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
