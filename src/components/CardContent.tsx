import styled from "styled-components"

import { CardContent as muiCardContent } from "@material-ui/core"

export const CardContent = styled(muiCardContent)`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`
