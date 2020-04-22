import React from "react"
import * as yup from "yup"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { useWizardContext } from "components/Wizard"
import { Header } from "./Header"
import { PhysicalProductSection } from "./PhysicalProductSection"
import { getEnumValues, getFormSelectChoices } from "utils/form"

export const getPhysicalProductsValidationSchema = values => {
  // TODO: Remove mock SKUs
  const skus = ["STIS-PNK-SS-015", "STIS-PNK-SS-015", "STIS-PNK-SS-015"]

  const schemaObject = {}
  skus.forEach(sku => {
    schemaObject[`${sku}_physicalProductStatus`] = yup.string().required("Required")
    schemaObject[`${sku}_dateOrdered`] = yup.date().required("Required")
    schemaObject[`${sku}_dateReceived`] = yup.date("Must be date").required("Required")
    schemaObject[`${sku}_unitCost`] = yup.number().required("Required")
  })

  return yup.object(schemaObject)
}

export interface PhysicalProductsProps {
  data: any
  validate: (values: any) => Object
}

export const PhysicalProducts: React.FC<PhysicalProductsProps> = ({ data }) => {
  const { values } = useWizardContext()

  if (!data?.physicalProductStatuses) {
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
    Array.from(Array(totalCount).keys()).map((_, index) => {
      console.log(index)
      physicalProductUIDs.push(`${sku}-${(index + 1).toString().padStart(2, "0")}`)
    })
  })

  const statusChoices = getFormSelectChoices(getEnumValues(data.physicalProductStatuses))
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Header title="Physical products" subtitle="Add metadata to physical products" />
        {physicalProductUIDs.map((uid, index) => (
          <PhysicalProductSection statusChoices={statusChoices} uid={uid} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
