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
  productData?: any
  productUpsertData: any
}

export const Overview: React.FC<OverviewProps> = ({ productData, productUpsertData }) => {
  const [productType, setProductType] = useState("Top")

  if (
    !productUpsertData?.bottomSizes ||
    !productUpsertData?.bottomSizeTypes ||
    !productUpsertData?.brands ||
    !productUpsertData?.categories ||
    !productUpsertData?.colors ||
    !productUpsertData?.inventoryStatuses ||
    !productUpsertData?.productArchitectures ||
    !productUpsertData?.productFunctions ||
    !productUpsertData?.productModels ||
    !productUpsertData?.productTypes ||
    !productUpsertData?.topSizes
  ) {
    return null
  }

  let sizes: any[] = []
  switch (productType) {
    case "Top":
      const topSizes: string[] = Array.from(new Set(productUpsertData.topSizes.map(topSize => topSize.letter)))
      topSizes.sort()
      sizes = getFormSelectChoices(topSizes)
      break
    case "Bottom":
      const bottomSizes: string[] = Array.from(
        new Set(productUpsertData.bottomSizes.map(bottomSize => bottomSize.value))
      )
      bottomSizes.sort()
      sizes = getFormSelectChoices(bottomSizes)
      break
  }

  const materials = materialsJSON.allMaterials
  const bottomSizeTypeChoices = getFormSelectChoices(getEnumValues(productUpsertData.bottomSizeTypes))
  const productArchitectures = getEnumValues(productUpsertData.productArchitectures)
  const productTypes = getEnumValues(productUpsertData.productTypes)
  const productFunctions = productUpsertData.productFunctions.map(productFunction => productFunction.name)
  const tags = productUpsertData.tags.map(tag => tag.name).sort()
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

  const headerTitle = productData?.name || "New product"
  const headerSubtitle = productData?.brand?.name || "Please fill out all required fields"
  const imageURLs = productData?.images?.map(image => image.url)

  return (
    <Box>
      <ContainerGrid container spacing={5}>
        <Header title={headerTitle} subtitle={headerSubtitle} />
        <Grid item xs={4}>
          <PhotographySection imageURLs={imageURLs} numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection
            brands={productUpsertData.brands}
            bottomSizeTypeChoices={bottomSizeTypeChoices}
            productType={productType}
            sizes={sizes}
            statuses={statuses}
          />
          <Spacer mt={6} />
          <MetadataSection
            architectures={productArchitectures}
            categories={productUpsertData.categories}
            colors={productUpsertData.colors}
            models={productUpsertData.productModels}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <TagsSection functions={productFunctions} materials={materials} tags={tags} />
          {productData?.variants && (
            <>
              <Spacer mt={6} />
              <VariantsOverviewSection variants={productData?.variants} />
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
