import React from "react"
import { Filter, ReferenceArrayInput, SelectArrayInput, TextInput } from "@seasons/react-admin"

export const MemberFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="user.firstName_contains" alwaysOn />
    <ReferenceArrayInput source="customer" reference="Customer">
      <SelectArrayInput />
    </ReferenceArrayInput>
  </Filter>
)
