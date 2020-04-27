import React from "react"

import { Container } from "@material-ui/core"

import { Header } from "./Header"

export const OverviewView: React.FC = props => {
  return (
    <Container maxWidth="lg">
      <Header />
    </Container>
  )
}
