import React, { useState } from "react"
import { DateTime } from "luxon"
import { Header as BaseHeader, ConfirmationDialog } from "components"
import { MemberSubViewProps } from "./interfaces"
import { AssignRolesModal } from "./AssignRolesModal"
import { useMutation } from "@apollo/react-hooks"
import { MEMBER_ASSIGN_ROLE } from "./queries"
import gql from "graphql-tag"
import { useSnackbarContext } from "components/Snackbar"
import { AddBagItemModal } from "./AddBagItemModal"

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

export const Header: React.FunctionComponent<MemberSubViewProps> = ({ member }) => {
  const [showResetPasswordConfirmation, setShowResetPasswordConfirmation] = useState(false)
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

  const [assignRolesModalIsOpen, setAssignRolesModal] = useState(false)
  const [showAddBagItemModal, setShowAddBagItemModal] = useState(false)

  const openAssignRolesModal = () => {
    setAssignRolesModal(true)
  }

  const openAddBagItemModal = () => {
    setShowAddBagItemModal(true)
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
          {
            text: "Add bag item",
            action: openAddBagItemModal,
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
      <AddBagItemModal customer={member} onClose={() => setShowAddBagItemModal(false)} open={showAddBagItemModal} />
      <ConfirmationDialog
        title="Are you sure you want to send a reset password email?"
        body="This user will receive an email with a reset password link."
        open={showResetPasswordConfirmation}
        setOpen={setShowResetPasswordConfirmation}
        onClose={onCloseResetPasswordConfirmationDialog}
      />
    </>
  )
}
