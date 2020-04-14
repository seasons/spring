import { productCreateQuery } from 'queries';
import React, { useEffect, useState } from "react"
import { Create, SimpleForm, TextInput, SelectInput, SelectArrayInput } from "react-admin"
import { Form, Field } from "react-final-form"

import { graphql } from 'react-apollo';

import { Box, Grid, GridList, GridListTile, styled as muiStyled, Input, Button } from "@material-ui/core"
import styled from "styled-components"
import { withStyles } from '@material-ui/core/styles';

import { Spacer, Text } from "components"
import { BottomNavBar, Dropzone, ProductCreateGeneralSection } from "./Components"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props?.data
  const [productType, setProductType] = useState("Top")

  console.log("Data:", data)
  if (
    !data?.bottomSizes || !data?.brands || !data?.colors || !data?.materials ||
    !data?.productFunctions || !data?.productModels || !data?.productTypes ||
    !data?.topSizes
  ) {
    return <div>Loading</div>
  }

  const onReceivedImageFile = (imageFile) => {
    console.log("RECEIVED IMAGE:", imageFile)
  }

  let sizes
  switch (productType) {
    case "Top":
      sizes = Array.from(new Set(data.topSizes.map(topSize => topSize.letter)))
      break
    case "Bottom":
      sizes = Array.from(new Set(data.bottomSizes.map(bottomSize => bottomSize.value)))
      break
  }

  const materials = data.materials.enumValues.map(enumValue => enumValue.name)
  const productTypes = data.productTypes.enumValues.map(enumValue => enumValue.name)
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
  const numImages = 4
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

  return (
    <Form
      onSubmit={onSubmit}
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
                <Text variant="h4">Photography</Text>
                <Spacer mt={2} />
                <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
                  <GridList cellHeight={516} cols={1}>
                    {[...Array(numImages)].map(index => (
                      <GridListTile key={index}>
                        <Dropzone onReceivedFile={onReceivedImageFile} />
                      </GridListTile>
                    ))}
                  </GridList>
                </Box>
                <Spacer mt={9} />
              </Grid>
              <ProductCreateGeneralSection brands={sortedBrands} sizes={sizes} statuses={statuses} />
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