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
        { id: "Hold", name: "Hold" },
        { id: "Submitted", name: "Submitted" },
        { id: "Fulfilled", name: "Fulfilled" },
        { id: "Cancelled", name: "Cancelled" },
      ]}
      alwaysOn
    />
    <TextInput label="Search Order Id" source="orderNumber_contains" alwaysOn />
    <TextInput label="Search first name" source="customer.user.firstName_contains" alwaysOn />
    <TextInput label="Search email" source="customer.user.email_contains" alwaysOn />
    <TextInput label="Search physical product id" source="lineItems_some.recordID_contains" alwaysOn />
  </Filter>
)
