import React from "react"
import { Filter, SelectInput, TextInput } from "@seasons/react-admin"

export const OrderFilter = props => (
  <Filter {...props}>
    <SelectInput
      label="Type"
      source="type"
      choices={[
        { id: "Used", name: "Used" },
        { id: "New", name: "New" },
      ]}
      alwaysOn
    />
    <SelectInput
      label="Status"
      source="status"
      choices={[
        { id: "Drafted", name: "Drafted" },
        { id: "Submitted", name: "Submitted" },
        { id: "Fulfilled", name: "Fulfilled" },
      ]}
      alwaysOn
    />
    <TextInput label="Search first name" source="customer.user.firstName_contains" alwaysOn />
    <TextInput label="Search email" source="customer.user.email_contains" alwaysOn />
  </Filter>
)
