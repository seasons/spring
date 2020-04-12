import { productCreateQuery } from 'queries';
import React, { useEffect, useState } from "react"
import { useDataProvider, useQuery, Loading, Error, Create, SimpleForm, ImageInput, TextInput } from "react-admin"
import { useDropzone } from 'react-dropzone'
import { graphql } from 'react-apollo';

import { Box, Button, Container, Grid, GridList, GridListTile, InputBase, MenuItem, Select, styled as muiStyled, Input } from "@material-ui/core"
import styled from "styled-components"
import { withStyles } from '@material-ui/core/styles';

import { Separator, Spacer, Text, TextField } from "components"
import { Dropzone } from "./Components"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data = props?.data
  const [brand, setBrand] = useState("")
  const [productName, setProductName] = useState("")
  const numImages = 4
  const brands = ["Acne", "Off-White", "Supreme",]
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
          <Grid item xs={4}>
            <Text variant="h4">Photography</Text>
            <Spacer mt={2} />
            <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
              <GridList cellHeight={516} cols={1}>
                <ImageInput
                  source="images"
                  label="Product Images"
                  accept="image/*"
                  multiple
                  placeholder={<p>Drop your file here</p>}
                >
                  <ProductImagePreview source="src" />
                </ImageInput>
                {[...Array(numImages)].map(index => (
                  <GridListTile key={index}>
                    <Dropzone onReceivedFile={onReceivedImageFile} />
                  </GridListTile>
                ))}
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
                <StyledSelect
                  value={brand ? brand : undefined}
                  placeholder="Select"
                  onChange={(event: any) => setBrand(event.target.value)}
                  input={<InputBase />}
                >
                  {brands.map(brand => (
                    <MenuItem value={brand}>{brand}</MenuItem>
                  ))}
                </StyledSelect>
              </Grid>
              <Grid item xs={6}>
                <Text variant="h6">Product name</Text>
                <Spacer mt={1} />
                <TextField placeholder="Max 50 characters" value={productName} onChange={(value) => setProductName(value)} />
              </Grid>
            </Grid>
          </Grid>
        </ContainerGrid>
      </SimpleForm>
    </Create>
  )
})

const ProductImagePreview: React.SFC<any> = ({ record }) => {
  console.log("RECORD:", record)
  if (record.rawFile) {
    return (
      <ImageContainer>
        <img src={record.rawFile.preview} alt="" />
      </ImageContainer>
    )
  }

  return null
}

const ImageContainer = styled.div`
  width: 300px;
  img {
    width: inherit;
  }
`

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})

const StyledSelect = muiStyled(Select)({
  border: '1px solid #e5e5e5',
  borderRadius: 4,
  height: 54,
  width: "100%",
})