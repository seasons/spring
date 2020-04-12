import { productCreateQuery } from 'queries';
import React, { useEffect, useState } from "react"
import { useDataProvider, useQuery, Loading, Error, Create, SimpleForm, ImageField, ImageInput, TextInput, SelectInput, SelectArrayInput } from "react-admin"
import { useDropzone } from 'react-dropzone'

import { graphql } from 'react-apollo';

import { Box, Button, Container, Grid, GridList, GridListTile, InputBase, MenuItem, Select, styled as muiStyled, Input } from "@material-ui/core"
import styled from "styled-components"
import { withStyles } from '@material-ui/core/styles';

import { Separator, Spacer, Text, TextField } from "components"
import { ImageInputPlaceholder, ProductImagePreview, ProductCreateGeneralSection } from "./Components"

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

  if (!data) {
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
      id: "Available",
      name: "Available",
    },
    {
      id: "NotAvailable",
      name: "Not available",
    },
  ]
  console.log("DATA:", data)
  return (
    <Create title="Create a Product" {...props}>
      <SimpleForm>
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
                <ImageInput
                  label={""}
                  source="images"
                  accept="image/*"
                  multiple
                  placeholder={<ImageInputPlaceholder />}
                >
                  <ProductImagePreview source="src" />
                </ImageInput>
              </GridList>
            </Box>
          </Grid>
          <ProductCreateGeneralSection brands={data.brands} sizes={sizes} statuses={statuses} />
        </ContainerGrid>
      </SimpleForm>
    </Create>
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
