import React from "react"
import get from "lodash/get"
import { Typography } from "@material-ui/core"
import { formatPrice } from "utils/price"

interface PriceFieldProps {
  record?: any
  label?: string
  source: string
}

export const PriceField: React.FC<PriceFieldProps> = ({ record, source }) => {
  const value = get(record, source)

  return (
    <Typography component="span" variant="body2">
      {formatPrice(value)}
    </Typography>
  )
}
