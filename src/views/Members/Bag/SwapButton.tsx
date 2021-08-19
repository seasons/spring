import React from "react"
import { Button, Typography } from "@material-ui/core"

interface SwapButtonProps {
  product: any
}

export const SwapButton: React.FunctionComponent<SwapButtonProps> = ({ product }) => {
  return (
    <Button variant="outlined">
      <Typography>Swap</Typography>
    </Button>
  )
}
