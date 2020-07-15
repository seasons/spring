import React from "react"
import { Box } from "@material-ui/core"
import { Filter, SelectInput, TextInput } from "@seasons/react-admin"
import { StatusInput } from "components"

export const MemberFilter = props => (
  <Box px={2}>
    <Filter {...props}>
      <TextInput label="Search first name" source="user.firstName_contains" alwaysOn />
      <SelectInput
        label="Status"
        source="status"
        choices={[
          { id: "Active", name: "Active" },
          { id: "Authorized", name: "Authorized" },
          { id: "Created", name: "Created" },
          { id: "Deactivated", name: "Deactivated" },
          { id: "Invited", name: "Invited" },
          { id: "Paused", name: "Paused" },
          { id: "Suspended", name: "Suspended" },
          { id: "Waitlisted", name: "Waitlisted" },
        ]}
        alwaysOn
      />
    </Filter>
  </Box>
)
