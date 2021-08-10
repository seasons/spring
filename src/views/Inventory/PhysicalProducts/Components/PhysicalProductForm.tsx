import React from "react"
import { Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"
import { Spacer, Text, ComponentError } from "components"
import { DatePickerField, SelectField, TextField } from "fields"
import { getFormSelectChoices } from "utils/form"
import { useQuery } from "react-apollo"
import { PHYSICAL_PRODUCT_STATUSES_QUERY } from "views/Inventory/Products/queries/Product"
import { Loading } from "@seasons/react-admin"
import { InventoryStatus, PhysicalProductOffloadMethod } from "generated/globalTypes"

export interface PhysicalProductFormProps {
  statuses?: any[]
  uid: string
  inventoryStatuses?: any[]
  offloadMethods?: any[]
  currentInventoryStatus?: InventoryStatus
}

export const PhysicalProductForm: React.FC<PhysicalProductFormProps> = ({
  statuses = [],
  uid,
  inventoryStatuses = [],
  offloadMethods = [],
  currentInventoryStatus = "",
}) => {
  const receivedStatusesFromParent = statuses.length > 0 && inventoryStatuses.length > 0 && offloadMethods.length > 0

  const { data, loading, error } = useQuery(PHYSICAL_PRODUCT_STATUSES_QUERY, {
    skip: receivedStatusesFromParent,
  })
  if (!receivedStatusesFromParent && loading) return <Loading />
  if (!receivedStatusesFromParent && error) return <ComponentError />

  statuses = receivedStatusesFromParent ? statuses : data?.physicalProductStatuses?.enumValues
  inventoryStatuses = receivedStatusesFromParent ? inventoryStatuses : data?.inventoryStatuses?.enumValues
  offloadMethods = receivedStatusesFromParent ? offloadMethods : data?.offloadMethods?.enumValues

  const inventoryStatusChoices = getFormSelectChoices(inventoryStatuses.map(status => status?.name)).map(a => ({
    ...a,
    disabled: ["Stored", "Offloaded"].includes(a.value),
  }))

  const statusChoices = getFormSelectChoices(statuses.map(status => status.name))
  const offloadMethodChoices = getFormSelectChoices(offloadMethods.map(method => method.name))

  return (
    <ContainerGrid container spacing={2}>
      <Grid item xs={6}>
        <Text variant="h5">Status *</Text>
        <Spacer mt={1} />
        <SelectField name={`${uid}_physicalProductStatus`} choices={statusChoices} requiredString initialValue="New" />
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
          disabled={["Offloaded", "Stored"].includes(currentInventoryStatus)}
          requiredString
          initialValue="NonReservable"
        />
      </Grid>
      {currentInventoryStatus === "Offloaded" && (
        <Grid item xs={6}>
          <Text variant="h5">Offload Method *</Text>
          <Spacer mt={1} />
          <SelectField
            name={`${uid}_offloadMethod`}
            choices={offloadMethodChoices}
            disabled={true}
            requiredString
            initialValue="Other"
          />
        </Grid>
      )}
      <Spacer grid mt={5} />
    </ContainerGrid>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
