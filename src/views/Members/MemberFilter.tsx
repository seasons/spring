import React from "react"
import { Box } from "@material-ui/core"
import { Filter, TextInput } from "@seasons/react-admin"
import { StatusInput } from "components"

export const MemberFilter = props => (
  <Box px={2}>
    <Filter {...props}>
      <TextInput label="Search first name" source="user.firstName_contains" alwaysOn />
      <StatusInput
        source="status_in"
        tabs={[
          { label: "All", id: "all", value: [] },
          {
            label: "Created",
            id: "created",
            value: ["Created"],
          },
          {
            label: "Waitlisted",
            id: "waitlisted",
            value: ["Waitlisted"],
          },
          {
            label: "Invited",
            id: "invited",
            value: ["Invited"],
          },
        ]}
        alwaysOn
      />
    </Filter>
  </Box>
)
