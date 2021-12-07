import React from "react"
import { Box, Link, Typography } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { Image } from "components"
import { StatusField } from "fields"

export const SearchResultCard = ({ result }) => {
  const { data } = result

  if (!data) {
    return <></>
  }

  switch (result.kindOf) {
    case "Search":
      return (
        <Box py={1}>
          <Typography variant="body1" color="textPrimary">
            Search for <b>{data?.query}</b>...
          </Typography>
        </Box>
      )
    case "Customer":
      const { user } = data
      return (
        <Box>
          <Link variant="h4" color="textPrimary" component={RouterLink} to={`/members/${data.objectID}/bag`}>
            {`${user?.firstName} ${user.lastName}`}
          </Link>
          <Typography variant="body2" color="textPrimary">
            {data?.email}
          </Typography>
          <StatusField record={data}></StatusField>
        </Box>
      )
    case "Brand":
      return (
        <Box>
          <Link variant="h4" color="textPrimary" component={RouterLink} to={`/inventory/brands//${data.objectID}`}>
            {`${data.name}`}
          </Link>
          <Typography variant="body2" color="textPrimary">
            {`${data.productsCount} products`}
          </Typography>
        </Box>
      )
    case "Product":
      return (
        <Box display="flex" flexDirection="row" pt={1} width="100%">
          <Box>
            <Image url={data.image} size="medium" />
          </Box>
          <Box ml={1} mb={2} flex={1}>
            <Link variant="h4" color="textPrimary" component={RouterLink} to={`/inventory/products/${data.objectID}`}>
              {data?.name}
            </Link>
            <Typography variant="body2" color="textPrimary">
              {data?.brandName}
            </Typography>
          </Box>
        </Box>
      )
    case "ShopifyProductVariant":
      return (
        <Box display="flex" flexDirection="row" pt={1} width="100%">
          <Box>
            <Image url={data.image} size="medium" />
          </Box>
          <Box ml={1} mb={2} flex={1}>
            <Typography variant="body2" color="textPrimary">
              {data?.displayName}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {data?.title}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {data?.externalId}
            </Typography>
          </Box>
        </Box>
      )
    case "PhysicalProduct":
      return (
        <Box width="100%">
          <Link
            variant="h4"
            color="textPrimary"
            component={RouterLink}
            to={`/inventory/product/variant/physicalProduct/${data.objectID}/manage`}
          >
            {data?.seasonsUID}
          </Link>
          <Typography variant="body2" color="textPrimary">
            {data?.barcode}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {data?.productName}
          </Typography>
        </Box>
      )

    default:
      return <></>
  }
}
