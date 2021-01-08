import React from "react"
import { Box, Link, Typography } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

export const ProductTile: React.FC<{ product: any }> = ({ product }) => {
  return (
    <Box>
      <img style={{ width: "100%" }} src={product.image} />
      <Box display="flex" flexDirection="row" mt={2}>
        <Box ml={1} mb={2} flex={1}>
          <Link color="textPrimary" component={RouterLink} to={`/inventory/products/${product.id}`}>
            <Typography variant="body2" color="textPrimary">
              {product?.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="textPrimary">
            {product?.brandName}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
