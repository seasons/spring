import { productCreateQuery } from 'queries';
import React, { useEffect, useState } from "react"
import { useDataProvider, useQuery, Loading, Error, Create, SimpleForm, ImageField, ImageInput, TextInput, SelectInput } from "react-admin"
import { useDropzone } from 'react-dropzone'

import { graphql } from 'react-apollo';

import { Box, Button, Container, Grid, GridList, GridListTile, InputBase, MenuItem, Select, styled as muiStyled, Input } from "@material-ui/core"
import styled from "styled-components"
import { withStyles } from '@material-ui/core/styles';

import { Separator, Spacer, Text, TextField } from "components"
import { ImageInputPlaceholder, ProductImagePreview } from "./Components"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props?.data
  const [brand, setBrand] = useState("")
  const [productName, setProductName] = useState("")
  const numImages = 4
  const onReceivedImageFile = (imageFile) => {
    console.log("RECEIVED IMAGE:", imageFile)
  }

  if (!data) {
    return <div>Loading</div>
  }

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
          <Grid item xs={8}>
            <Text variant="h4">General</Text>
            <Spacer mt={2} />
            <Separator />
            <Spacer mt={3} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Text variant="h6">Brand</Text>
                <Spacer mt={1} />
                <StyledSelectInput source="brand" choices={data.brands} />
              </Grid>
              <Grid item xs={6}>
                <Text variant="h6">Product name</Text>
                <Spacer mt={1} />
                <StyledTextInput source="name" placeholder="Max 50 characters" />
              </Grid>
            </Grid>
          </Grid>
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

const StyledTextInput = muiStyled(TextInput)({
  width: "100%",
})