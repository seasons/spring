import React from "react"
import styled from "styled-components"
import { Box, BoxProps } from "@material-ui/core"
import { SeasonsLogo } from "icons/SeasonsLogo"

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: flex-top;
  align-items: center;
`

interface LogoProps extends BoxProps {
  color?: "black" | "white"
}

export const Logo: React.FC<LogoProps> = ({ color = "black", ...rest }) => {
  return (
    <Container {...rest}>
      <SeasonsLogo color={color} size="80" />
    </Container>
  )
}
