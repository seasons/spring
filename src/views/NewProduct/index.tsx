import React from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"

import { colors, Container, Box, Theme, Typography } from "@material-ui/core"

import { Spacer, Text } from "components"
import Header from "views/Overview/Header"

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
      </Box>
    </Container>
  )
}
