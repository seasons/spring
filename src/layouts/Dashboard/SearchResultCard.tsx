import React from "react"
import { Box, Divider, Link, Typography } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { Image } from "components"

export const SearchResultCard = ({ result }) => {
  const { data } = result

  switch (result.kindOf) {
    case "Product":
      return (
        <>
          <Box display="flex" flexDirection="row">
            <Box>
              <Image url={data.image} size="medium" />
            </Box>
            <Box ml={1} mb={2} flex={1}>
              <Link variant="h4" color="textPrimary" component={RouterLink} to={`/inventory/products/${data.id}`}>
                {data?.name}
              </Link>
              <Typography variant="body2" color="textPrimary">
                {data?.brandName}
              </Typography>
            </Box>
          </Box>
          <Box my={1}>
            <Divider />
          </Box>
        </>
      )
    case "PhysicalProduct":
      return (
        <Box>
          <Link
            variant="h4"
            color="textPrimary"
            component={RouterLink}
            to={`/inventory/product/variant/physicalProducts/${data.id}`}
          >
            {data?.seasonsUID}
          </Link>
          <Typography variant="body2" color="textPrimary">
            {data?.barcode}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {data?.productName}
          </Typography>
          <Box my={1}>
            <Divider />
          </Box>
        </Box>
      )

    default:
      return <></>
  }
}
