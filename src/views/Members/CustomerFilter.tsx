import React from "react"
import { Filter, ReferenceArrayInput, SelectArrayInput, TextInput } from "react-admin"

export const CustomerFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="firstName_contains" alwaysOn />
    <ReferenceArrayInput label="Customers" source="customer" reference="Customer">
      <SelectArrayInput />
    </ReferenceArrayInput>
  </Filter>
)
