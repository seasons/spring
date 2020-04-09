import React, { useState } from "react"

import { Box, Button, Container, Grid, GridList, GridListTile, InputBase, MenuItem, Select, styled, Input } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';

import { Separator, Spacer, Text } from "components"
import { Dropzone } from "./Components"

export interface NewProductViewProps {
  history: any
  match: any
  props?: any
}

export const NewProductView: React.FunctionComponent<NewProductViewProps> = ({ match, history, props }) => {
  const [brand, setBrand] = useState("")
  const numImages = 4
  const brands = ["Acne", "Off-White", "Supreme",]
  return (
    <Container maxWidth={false}>
      <Box mt={8}>
        <Text variant="h3">New product</Text>
        <Spacer mt={0.5} />
        <Text variant="h5" opacity={0.5}>Please fill out all required fields</Text>
        <Spacer mt={4} />
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Text variant="h4">Photography</Text>
            <Spacer mt={2} />
            <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
              <GridList cellHeight={516} cols={1}>
                {[...Array(numImages)].map(index => (
                  <GridListTile key={index}>
                    <Dropzone onReceivedFiles={() => { console.log("UPLOADED") }} />
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

const StyledSelect = styled(Select)({
  border: '1px solid #e5e5e5',
  borderRadius: 4,
  height: 48,
  width: "100%",
})