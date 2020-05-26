import React from "react"
import { Box } from "@material-ui/core"
import { Filter, ReferenceArrayInput, SelectArrayInput, TextInput } from "@seasons/react-admin"

export const MemberFilter = props => (
  <Box px={2}>
    <Filter {...props}>
      <TextInput label="Search" source="user.firstName_contains" alwaysOn />
      <ReferenceArrayInput source="customer" reference="Customer">
        <SelectArrayInput />
      </ReferenceArrayInput>
    </Filter>
  </Box>
)
