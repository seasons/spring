import React from "react"

import { Container } from "@material-ui/core"
import { Header } from "components"

export const AnalyticsView: React.FC = props => {
  return (
    <Container maxWidth="lg">
      <Header title="Analytics" />
    </Container>
  )
}
