import { LogoMark } from "icons"
import React from "react"
import styled from "styled-components"
import { Typography, Box, BoxProps } from "@material-ui/core"
import { colors } from "theme"
import { SeasonsLogo } from "icons/SeasonsLogo"

const Mark = styled(LogoMark)`
  display: inline-block;
  margin-right: 8px;
`

const LogoText = styled(Typography)`
  font-family: "Apercu-Mono", sans-serif;
  color: ${p => p.color};
  letter-spacing: 1px;
  font-weight: 500;
`

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
