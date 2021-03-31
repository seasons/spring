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
  </Filter>
)
