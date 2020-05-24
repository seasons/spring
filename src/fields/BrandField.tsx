import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

interface BrandFieldProps {
  label?: string
  record?: any
}

export const BrandField: React.FC<BrandFieldProps> = ({ label, record }) => {
  const name = record?.brand?.name
  const id = record?.brand?.id

  return (
    <Link
      component={RouterLink}
      to={`/brands/${id}`}
      variant="body1"
      onClick={e => e.stopPropagation()}
    >{`${name}`}</Link>
  )
}
