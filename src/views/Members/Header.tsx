import React, { useState } from "react"
import { DateTime } from "luxon"
import { Header as BaseHeader } from "components"
import { MemberViewHeaderProps } from "./interfaces"
import { AssignRolesModal } from "./AssignRolesModal"
import { useMutation } from "@apollo/react-hooks"
import { Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"

export const Header: React.FunctionComponent<MemberViewHeaderProps> = ({ history, member }) => {
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

  const assignRolesToMember = member => {
    console.log("assigning to ", member)
    closeAssignRolesModal()
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
        onSave={() => assignRolesToMember(member)}
        onClose={closeAssignRolesModal}
        open={assignRolesModalIsOpen}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
