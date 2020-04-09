import React from "react"

import { Box, Button, Container, Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { Dropzone } from "./Components"

export interface NewProductViewProps {
  history: any
  match: any
  props?: any
}

export const NewProductView: React.FunctionComponent<NewProductViewProps> = ({ match, history, props }) => {
  return (
    <Container maxWidth={false}>
      <Box mt={4}>
        <Text variant="h3">New product</Text>
        <Spacer mt={0.5} />
        <Text variant="h5" opacity={0.5}>Please fill out all required fields</Text>
        <Spacer mt={4} />
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Text variant="h4">Photography</Text>
            <Spacer mt={2} />
            <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
              <Dropzone onReceivedFiles={() => { console.log("UPLOADED") }} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Text variant="h4">General</Text>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
