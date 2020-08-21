import React from "react"
import { Filter, SelectInput } from "@seasons/react-admin"

export const FitPicFilter = props => (
  <Filter {...props}>
    <SelectInput
      label="Status"
      source="status"
      choices={[
        { id: "Submitted", name: "Submitted" },
        { id: "Published", name: "Published" },
        { id: "Unpublished", name: "Unpublished" },
      ]}
      alwaysOn
    />
    <SelectInput label="Reports" source="reports_some.status" choices={[{ id: "Pending", name: "Pending" }]} alwaysOn />
  </Filter>
)
