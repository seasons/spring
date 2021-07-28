import React from "react"
import { Box } from "@material-ui/core"
import { Filter, SelectInput, TextInput } from "@seasons/react-admin"
import { States } from "utils/USStates"
export { States } from "utils/USStates"

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
      <SelectInput
        label="Authorizations"
        source="admissions.authorizationsCount"
        choices={[
          { id: 0, name: "0" },
          { id: 1, name: "1" },
          { id: 2, name: "2" },
          { id: 3, name: "3" },
          { id: 4, name: "4" },
          { id: 5, name: "5" },
          { id: 6, name: "6" },
        ]}
        alwaysOn
      />
      <SelectInput
        label="Admissable"
        source="admissions.admissable"
        choices={[
          { id: true, name: "True" },
          { id: false, name: "False" },
        ]}
        alwaysOn
      />
      <SelectInput
        label="AllAccessEnabled"
        source="admissions.allAccessEnabled"
        choices={[
          { id: true, name: "True" },
          { id: false, name: "False" },
        ]}
        alwaysOn
      />

      <SelectInput label="State" source="detail.shippingAddress.state" choices={States} alwaysOn />
    </Filter>
  </Box>
)
