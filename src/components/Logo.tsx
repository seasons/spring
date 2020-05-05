import { LogoMark } from "icons"
import React from "react"
import styled from "styled-components"
import { Typography, Box, BoxProps } from "@material-ui/core"
import { colors } from "theme"

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
  height: 45px;
`

interface LogoProps extends BoxProps {
  color?: "black" | "white"
}

export const Logo: React.FC<LogoProps> = ({ color = "black", ...rest }) => {
  return (
    <Container {...rest}>
      <Mark />
      <LogoText
        variant="h4"
        color={color === "white" ? colors.white100 : colors.black100}
        style={{ display: "inline-block" }}
      >
        SEASONS
      </LogoText>
    </Container>
  )
}
