import React from "react"

import { Box } from "@material-ui/core"

export interface SpacerProps {
  mt?: number
  mb?: number
  ml?: number
  mr?: number
}

/**
 * A component used to inject space where it's needed
 */
export const Spacer: React.FC<SpacerProps> = props => {
  return <Box {...props} />
}
