import { Spacer } from "components"
import React, { useState } from "react"
import { getEnumValues, getFormSelectChoices } from "utils/form"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import materialsJSON from "data/materials.json"
import { GeneralSection } from "./GeneralSection"
import { Header } from "./Header"
import { MetadataSection } from "./MetadataSection"
import { PhotographySection } from "./PhotographySection"
import { TagsSection } from "./TagsSection"
import { VariantsOverviewSection } from "./VariantsOverviewSection"

export interface OverviewProps {
  data: any
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [productType, setProductType] = useState("Top")

  if (
    !data?.bottomSizes ||
    !data?.bottomSizeTypes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.inventoryStatuses ||
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

  const materials = materialsJSON.allMaterials
  const bottomSizeTypeChoices = getFormSelectChoices(getEnumValues(data.bottomSizeTypes))
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const productFunctions = data.productFunctions.map(productFunction => productFunction.name)
  const tags = data.tags.map(tag => tag.name).sort()
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

  const product = data?.product
  const headerTitle = product?.name || "New product"
  const headerSubtitle = product?.brand?.name || "Please fill out all required fields"
  const imageURLs = product?.images?.map(image => image.url)

  const isEditing = !!product?.variants

  return (
    <Box>
      <ContainerGrid container spacing={5}>
        <Header title={headerTitle} subtitle={headerSubtitle} />
        <Grid item xs={4}>
          <PhotographySection imageURLs={imageURLs} numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection
            brands={data.brands}
            bottomSizeTypeChoices={bottomSizeTypeChoices}
            isEditing={isEditing}
            productType={productType}
            sizes={sizes}
            statuses={statuses}
          />
          <Spacer mt={6} />
          <MetadataSection
            architectures={productArchitectures}
            categories={data.categories}
            colors={data.colors}
            isEditing={isEditing}
            models={data.productModels}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <TagsSection functions={productFunctions} materials={materials} tags={tags} />
          {isEditing && (
            <>
              <Spacer mt={6} />
              <VariantsOverviewSection variants={product?.variants} />
              <Spacer mt={6} />
            </>
          )}
        </Grid>
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
