import React from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"

import { colors, Container, Box, Theme, Typography } from "@material-ui/core"

import { Label } from "components"
import Header from "views/Overview/Header"

export interface NewProductViewProps {
  history: any
  match: any
  props?: any
}

export const NewProductView: React.FunctionComponent<NewProductViewProps> = ({ match, history, props }) => {
  return (
    <Container maxWidth={false}>
      <Typography color="textPrimary" variant="h2">
        New product
       </Typography>
    </Container>
  )
}
