import React from "react"
import { Filter, SelectInput } from "@seasons/react-admin"

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
  </Filter>
)
