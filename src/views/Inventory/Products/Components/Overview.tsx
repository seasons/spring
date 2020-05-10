import { Spacer } from "components"
import React, { useState } from "react"
import { getEnumValues, getFormSelectChoices } from "utils/form"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { GeneralSection } from "./GeneralSection"
import { Header } from "./Header"
import { MetadataSection } from "./MetadataSection"
import { PhotographySection } from "./PhotographySection"
import { TagsSection } from "./TagsSection"

export interface OverviewProps {
  data: any
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [productType, setProductType] = useState("Top")

  if (
    !data?.bottomSizes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.products ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return null
  }

  let sizes: any[] = []
  switch (productType) {
    case "Top":
      const topSizes: string[] = Array.from(new Set(data.topSizes.map(topSize => topSize.letter)))
      topSizes.sort()
      sizes = getFormSelectChoices(topSizes)
      break
    case "Bottom":
      const bottomSizes: string[] = Array.from(new Set(data.bottomSizes.map(bottomSize => bottomSize.value)))
      bottomSizes.sort()
      sizes = getFormSelectChoices(bottomSizes)
      break
  }

  const allMaterials = new Set<string>()
  data.products.forEach(product => {
    product.innerMaterials.forEach(material => allMaterials.add(material))
    product.outerMaterials.forEach(material => allMaterials.add(material))
  })
  const materials = Array.from(allMaterials).sort()
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const productFunctions = data.productFunctions.map(productFunction => productFunction.name)
  const tags: string[] = Array.from(
    new Set(
      data.products
        .map(product => product.tags.map(tag => tag.name))
        .filter(Boolean)
        .flat()
        .sort()
    )
  )
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

  return (
    <Box mx={5}>
      <ContainerGrid container spacing={5}>
        <Header title="New product" subtitle="Please fill out all required fields" />
        <Grid item xs={4}>
          <PhotographySection numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection brands={data.brands} productType={productType} sizes={sizes} statuses={statuses} />
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
