import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { DatePickerField, SelectField, TextField } from "fields"
import { FormSelectChoice } from "utils/form"

export interface PhysicalProductSectionProps {
  inventoryStatusChoices: FormSelectChoice[]
  statusChoices: FormSelectChoice[]
  uid: string
}

export const PhysicalProductSection: React.FC<PhysicalProductSectionProps> = ({
  inventoryStatusChoices,
  statusChoices,
  uid,
}) => {
  return (
    <ExpandableSection
      title={uid}
      content={
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Text variant="h5">Status *</Text>
            <Spacer mt={1} />
            <SelectField
              name={`${uid}_physicalProductStatus`}
              choices={statusChoices}
              requiredString
              initialValue="New"
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h5">Date ordered</Text>
            <Spacer mt={1} />
            <DatePickerField name={`${uid}_dateOrdered`} optionalDate />
          </Grid>
          <Spacer grid mt={3} />
          <Grid item xs={6}>
            <Text variant="h5">Unit cost</Text>
            <Spacer mt={1} />
            <TextField name={`${uid}_unitCost`} type="number" optionalNumber />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h5">Date received</Text>
            <Spacer mt={1} />
            <DatePickerField name={`${uid}_dateReceived`} optionalDate />
          </Grid>
          <Spacer grid mt={3} />
          <Grid item xs={6}>
            <Text variant="h5">Inventory Status *</Text>
            <Spacer mt={1} />
            <SelectField
              name={`${uid}_inventoryStatus`}
              choices={inventoryStatusChoices}
              requiredString
              initialValue="NonReservable"
            />
          </Grid>
          <Spacer grid mt={5} />
        </Grid>
      }
    />
  )
}
