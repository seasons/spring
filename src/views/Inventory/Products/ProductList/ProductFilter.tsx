import React from "react"
import { Filter, SelectInput, TextInput } from "@seasons/react-admin"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} alwaysOn />
    <SelectInput
      label="Publish status"
      source="status"
      choices={[
        { id: "Available", name: "Published" },
        { id: "NotAvailable", name: "Not Published" },
        { id: "Stored", name: "Stored" },
        { id: "Offloaded", name: "Offloaded" },
      ]}
      alwaysOn
    />
    <SelectInput
      label="Photography"
      source="photographyStatus"
      choices={[
        { id: "Done", name: "Done" },
        { id: "InProgress", name: "In progress" },
        { id: "ReadyForEditing", name: "Ready for editing" },
        { id: "ReadyToShoot", name: "Ready to shoot" },
        { id: "Steam", name: "Steam" },
      ]}
      alwaysOn
    />
  </Filter>
)
