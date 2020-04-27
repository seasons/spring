import React from "react"
import styled from "styled-components"

import { Container, Typography } from "@material-ui/core"

const ContainerStyled = styled(Container)`
  margin-top: 30vh;
  margin-left: 15vw;
`

export const AnalyticsView: React.FC = props => {
  return (
    <ContainerStyled maxWidth="lg">
      <Typography variant="h1">All them fancy charts will go here!</Typography>
    </ContainerStyled>
  )
}
