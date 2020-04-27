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
        <Header title="New product" subtitle="Please fill out all required fields" />
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
