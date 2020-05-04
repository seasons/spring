import { LogoMark } from "icons"
import { Spacer } from "components"
import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { colors } from "theme"

const LogoText = styled(Typography)`
  font-family: "Apercu-Mono", sans-serif;
  color: ${colors.white100};
  letter-spacing: 1px;
  font-weight: 500;
`

export const Logo: React.FunctionComponent = () => {
  return (
    <>
      <LogoMark />
      <Spacer ml={2} />
      <LogoText variant="h4">SEASONS</LogoText>
    </>
  )
}
