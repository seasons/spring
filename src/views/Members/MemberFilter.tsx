import React from "react"
import { Filter, ReferenceArrayInput, SelectArrayInput, TextInput } from "react-admin"

export const MemberFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="firstName_contains" alwaysOn />
    <ReferenceArrayInput source="customer" reference="Customer">
      <SelectArrayInput />
    </ReferenceArrayInput>
  </Filter>
)
