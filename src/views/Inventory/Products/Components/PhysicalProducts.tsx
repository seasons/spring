import React from "react"
import { useFormState } from "react-final-form"
import { getEnumValues, getFormSelectChoices } from "utils/form"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { Header } from "./Header"
import { PhysicalProductSection } from "./PhysicalProductSection"

export interface PhysicalProductsProps {
  data: any
  values: any
}

export const PhysicalProducts: React.FC<PhysicalProductsProps> = ({ data, values }) => {
  if (!data?.physicalProductStatuses || !data?.inventoryStatuses) {
    return null
  }

  // Read SKU values
  const sizes = values?.sizes || []
  const sizesToSKUs = {}
  const sizesToTotalCounts = {}
  Object.entries(values).forEach(([key, value]) => {
    const components = key.split("_")
    if (components.length === 2) {
      const size = components[0]
      switch (components[1]) {
        case "sku":
          sizesToSKUs[size] = value
          break
        case "totalcount":
          const valueAsString = value as string
          sizesToTotalCounts[size] = parseInt(valueAsString) || 0
          break
        default:
          break
      }
    }
  })

  const physicalProductUIDs: string[] = []

  sizes.forEach(size => {
    const sku: string = sizesToSKUs[size]
    const totalCount: number = sizesToTotalCounts[size]
    Array.from(Array(totalCount).keys()).forEach((_, index) => {
      physicalProductUIDs.push(`${sku}-${(index + 1).toString().padStart(2, "0")}`)
    })
  })

  const inventoryStatusChoices = getFormSelectChoices(getEnumValues(data.inventoryStatuses))
  const statusChoices = getFormSelectChoices(getEnumValues(data.physicalProductStatuses))
  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header title="Physical products" subtitle="Add metadata to physical products" />
        {physicalProductUIDs.map((uid, index) => (
          <PhysicalProductSection
            inventoryStatusChoices={inventoryStatusChoices}
            statusChoices={statusChoices}
            uid={uid}
            key={index}
          />
        ))}
        <Spacer mt={2} />
        <Text variant="h5" opacity={0.5}>
          Note: Submission may take a while so please be patient. You will be redirected upon completion.
        </Text>
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
