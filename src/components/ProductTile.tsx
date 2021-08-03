import React from "react"
import { Box, Link, Typography } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

export const ProductTile: React.FC<{ product: any }> = ({ product }) => {
  const imageURL = product?.images?.[0]?.url
  const brandName = product?.brand?.name

  if (!product) {
    return null
  }
  return (
    <Box mb={3}>
      <img style={{ width: "100%" }} alt="" src={imageURL ?? ""} />
      <Box display="flex" flexDirection="row" mt={1}>
        <Box flex={1}>
          <Link color="textPrimary" component={RouterLink} to={`/inventory/products/${product.id}`}>
            <Typography variant="body2" color="textPrimary">
              {product?.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="textPrimary">
            {brandName}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
