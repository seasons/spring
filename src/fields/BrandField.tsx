import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import get from "lodash/get"

interface BrandFieldProps {
  label?: string
  record?: any
  source?: string
}

export const BrandField: React.FC<BrandFieldProps> = ({ label, record, source = "brand" }) => {
  const { id, name } = get(record, source)

  return (
    <Link
      component={RouterLink}
      to={`/brands/${id}`}
      variant="body1"
      onClick={e => e.stopPropagation()}
    >{`${name}`}</Link>
  )
}
