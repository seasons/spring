import { productCreateQuery } from 'queries';
import React, { useEffect, useState } from "react"
import { Create, SimpleForm, TextInput, SelectInput, SelectArrayInput } from "react-admin"
import { Form, Field } from "react-final-form"

import { graphql } from 'react-apollo';

import { Box, Grid, GridList, GridListTile, styled as muiStyled, Input } from "@material-ui/core"
import styled from "styled-components"
import { withStyles } from '@material-ui/core/styles';

import { Spacer, Text } from "components"
import { Dropzone, ProductCreateGeneralSection } from "./Components"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props?.data
  const onReceivedImageFile = (imageFile) => {
    console.log("RECEIVED IMAGE:", imageFile)
  }

  if (!data?.brands) {
    return <div>Loading</div>
  }

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ]

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
  const onSubmit = (values) => {

  }
  const sortedBrands = [...data.brands].sort((brandA, brandB) => {
    return brandA.name < brandB.name
      ? -1
      : brandA.name === brandB.name
        ? 0
        : 1
  })
  console.log("DATA:", data)
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
              </Grid>
              <ProductCreateGeneralSection brands={sortedBrands} sizes={sizes} statuses={statuses} />
            </ContainerGrid>
          </form>
        </Box>
      )}
    />
  )
})

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})

const StyledSelectInput = muiStyled(SelectInput)({
  width: "100%",
})

const StyledSelectArrayInput = muiStyled(SelectArrayInput)({
  width: "100%",
})

const StyledTextInput = muiStyled(TextInput)({
  width: "100%",
})
