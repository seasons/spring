import React, { useState } from "react"
import { DateTime } from "luxon"
import { Header as BaseHeader } from "components"
import { MemberViewHeaderProps } from "./interfaces"
import { AssignRolesModal } from "./AssignRolesModal"
import { useMutation } from "@apollo/react-hooks"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { MEMBER_ASSIGN_ROLE } from "./queries"

export const Header: React.FunctionComponent<MemberViewHeaderProps> = ({ history, member }) => {
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
    console.log("assigning to ", email, newRoles)
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
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
