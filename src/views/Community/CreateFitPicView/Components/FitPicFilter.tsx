import React from "react"
import { Filter, SelectInput } from "@seasons/react-admin"

export const FitPicFilter = props => (
  <Filter {...props}>
    <SelectInput
      label="Status"
      source="adminFilter"
      choices={[
        { id: "Live", name: "Live" },
        { id: "Submitted", name: "Submitted" },
        { id: "Reported", name: "Reported" },
        { id: "Unapproved", name: "Unapproved" },
      ]}
      alwaysOn
    />
  </Filter>
)
