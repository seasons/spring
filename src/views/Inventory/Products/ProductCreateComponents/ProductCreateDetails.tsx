import React, { useState } from "react"
import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { useWizard } from "components/Wizard"
import { ProductCreateGeneralSection } from "./ProductCreateGeneralSection"
import { ProductCreateMetadataSection } from "./ProductCreateMetadataSection"
import { ProductCreatePhotographySection } from "./ProductCreatePhotographySection"
import { ProductCreateTagsSection } from "./ProductCreateTagsSection"

export interface ProductCreateDetailsProps {
  data: any
  validate: (values: any) => Object
}

export const ProductCreateDetails: React.FC<ProductCreateDetailsProps> = ({ data }) => {
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
    return <div>Loading</div>
  }

  const onReceivedImageFile = imageFile => {
    console.log("RECEIVED IMAGE:", imageFile)
  }

  let sizes
  switch (productType) {
    case "Top":
      const topSizes = Array.from(new Set(data.topSizes.map(topSize => topSize.letter)))
      sizes = topSizes.map(topSize => ({
        display: topSize,
        value: topSize,
      }))
      break
    case "Bottom":
      const bottomSizes = Array.from(new Set(data.bottomSizes.map(bottomSize => bottomSize.value)))
      sizes = bottomSizes.map(bottomSize => ({
        display: bottomSize,
        value: bottomSize,
      }))
      break
  }

  const getEnumValues = obj => obj.enumValues.map(enumValue => enumValue.name)
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
          <ProductCreatePhotographySection numImages={4} onReceivedImageFile={onReceivedImageFile} />
        </Grid>
        <Grid item xs={8}>
          <ProductCreateGeneralSection brands={sortedBrands} sizes={sizes} statuses={statuses} />
          <Spacer mt={6} />
          <ProductCreateMetadataSection
            architectures={productArchitectures}
            categories={data.categories}
            colors={data.colors}
            models={data.productModels}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <ProductCreateTagsSection functions={productFunctions} materials={materials} tags={tags} />
        </Grid>
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
