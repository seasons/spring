import React from "react"
import * as yup from "yup"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

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
  skus: string[]
  validate: (values: any) => Object
}

export const PhysicalProducts: React.FC<PhysicalProductsProps> = ({ data, skus }) => {
  if (!data?.physicalProductStatuses) {
    return null
  }
  const statusChoices = getFormSelectChoices(getEnumValues(data.physicalProductStatuses))
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Header title="Physical products" subtitle="Add metadata to physical products" />
        {skus.map((sku, index) => (
          <PhysicalProductSection sku={sku} statusChoices={statusChoices} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
