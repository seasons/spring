import { productCreateQuery } from 'queries';
import React, { useState } from "react"
import { graphql } from 'react-apollo';
import { Form } from "react-final-form"

import { Box, Grid, styled as muiStyled, Button } from "@material-ui/core"

import { Spacer, Text } from "components"
import { BottomNavBar, ProductCreateGeneralSection, ProductCreateMetadataSection, ProductCreatePhotographySection, ProductCreateTagsSection } from "./Components"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props?.data
  const [productType, setProductType] = useState("Top")

  if (
    !data?.bottomSizes || !data?.brands || !data?.categories || !data?.colors ||
    !data?.materials || !data?.products || !data?.productArchitectures ||
    !data?.productFunctions || !data?.productModels || !data?.productTypes || !data?.topSizes
  ) {
    return <div>Loading</div>
  }

  const onReceivedImageFile = (imageFile) => {
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

  const getEnumValues = (obj) => obj.enumValues.map(enumValue => enumValue.name)
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
  const onCancel = () => {

  }
  const onNext = () => {

  }
  const onSubmit = (values) => {
    console.log("SUBMITTED VALUES", values)
  }
  const sortedBrands = [...data.brands].sort((brandA, brandB) => {
    return brandA.name < brandB.name
      ? -1
      : brandA.name === brandB.name
        ? 0
        : 1
  })

  const initialValues = {
    productType,
    retailPrice: 0,
    status: "NotAvailable"
  }
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <Box mx={5}>
          <form onSubmit={handleSubmit}>
            <ContainerGrid container spacing={5} >
              <Grid item xs={12}>
                <Spacer mt={3} />
                <Text variant="h3">New product</Text>
                <Spacer mt={0.5} />
                <Text variant="h5" opacity={0.5}>Please fill out all required fields</Text>
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
                <ProductCreateTagsSection
                  functions={productFunctions}
                  materials={materials}
                  tags={tags}
                />
              </Grid>
              <Button type="submit">Submit</Button>
            </ContainerGrid>
            <BottomNavBar onCancel={onCancel} onNext={onNext} />
          </form>
        </Box>
      )}
    />
  )
})

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})