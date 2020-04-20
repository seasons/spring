import React, { useState } from "react"
import * as yup from "yup"
import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { GeneralSection } from "./GeneralSection"
import { MetadataSection } from "./MetadataSection"
import { PhotographySection } from "./PhotographySection"
import { TagsSection } from "./TagsSection"
import { getEnumValues, getFormSelectChoices } from "utils/form"

export const overviewValidationSchema = yup.object({
  brand: yup.string().required("Required"),
  name: yup
    .string()
    .required("Required")
    .max(50),
  description: yup
    .string()
    .required("Required")
    .max(140),
  sizes: yup
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
  status: yup.string().required("Required"),
  model: yup.string().required("Required"),
  modelSize: yup.string().required("Required"),
  productType: yup.string().required("Required"),
  season: yup.string().required("Required"),
  retailPrice: yup.number().required("Required"),
  architecture: yup.string().required("Required"),
  category: yup.string().required("Required"),
  subCategory: yup.string().required("Required"),
  color: yup.string().required("Required"),
  secondaryColor: yup.string().required("Required"),
  functions: yup
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
  outerMaterials: yup
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
  innerMaterials: yup
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
  tags: yup
    .array()
    .of(yup.string().required("Required"))
    .required("Required"),
})

export interface OverviewProps {
  data: any
  validate: (values: any) => Object
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [productType, setProductType] = useState("Top")

  if (
    !data?.bottomSizes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.materials ||
    !data?.products ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return null
  }

  const onReceivedImageFile = imageFile => {
    console.log("RECEIVED IMAGE:", imageFile)
  }

  let sizes: any[] = []
  switch (productType) {
    case "Top":
      const topSizes: string[] = Array.from(new Set(data.topSizes.map(topSize => topSize.letter)))
      sizes = getFormSelectChoices(topSizes)
      break
    case "Bottom":
      const bottomSizes: string[] = Array.from(new Set(data.bottomSizes.map(bottomSize => bottomSize.value)))
      sizes = getFormSelectChoices(bottomSizes)
      break
  }

  const materials = getEnumValues(data.materials)
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const productFunctions = data.productFunctions.map(productFunction => productFunction.name)
  const tags: string[] = Array.from(new Set(data.products.map(product => product.tags.set).flat()))
  const statuses = [
    {
      value: "Available",
      display: "Available",
    },
    {
      value: "NotAvailable",
      display: "Not available",
    },
  ]
  const sortedBrands = [...data.brands].sort((brandA, brandB) => {
    return brandA.name < brandB.name ? -1 : brandA.name === brandB.name ? 0 : 1
  })

  return (
    <Box mx={5}>
      <ContainerGrid container spacing={5}>
        <Grid item xs={12}>
          <Spacer mt={3} />
          <Text variant="h3">New product</Text>
          <Spacer mt={0.5} />
          <Text variant="h5" opacity={0.5}>
            Please fill out all required fields
          </Text>
          <Spacer mt={4} />
        </Grid>
        <Grid item xs={4}>
          <PhotographySection numImages={4} onReceivedImageFile={onReceivedImageFile} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection brands={sortedBrands} sizes={sizes} statuses={statuses} />
          <Spacer mt={6} />
          <MetadataSection
            architectures={productArchitectures}
            categories={data.categories}
            colors={data.colors}
            models={data.productModels}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <TagsSection functions={productFunctions} materials={materials} tags={tags} />
        </Grid>
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
