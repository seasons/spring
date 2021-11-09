import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Typography, Box, Paper, IconButton } from "@material-ui/core"
import { useQuery } from "react-apollo"
import { PHYSICAL_PRODUCT_WITH_IMAGES } from "views/Inventory/PhysicalProducts/queries"
import CloseIcon from "@material-ui/icons/Close"
import { StowProductInfoReports } from "./StowProductInfoReports"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: any }) => {
  const { data, loading } = useQuery(PHYSICAL_PRODUCT_WITH_IMAGES, { variables: { id: product.id } })
  const [image, setImage] = useState({ url: "" })

  useEffect(() => {
    if (!loading) {
      setImage(data?.physicalProduct?.productVariant?.product?.images?.[0])
    }
  }, [data, loading])

  return <Image src={image?.url} width={200} height={250} />
}

interface StowProductInfoProps {
  product?: any
  locations?: any[]
  barcode?: string

  onRemove?: (text: string) => void
}

export const StowMultiProductsInfo: React.FC<StowProductInfoProps> = ({ product, onRemove }) => {
  if (!product) {
    return null
  }

  return (
    <Box mt={6} mb={1}>
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>
          <Box flexGrow={1} px={2}>
            <Box my={2}>
              <Box display="flex" flexDirection="column">
                <Box pb={2}>
                  <Typography variant="overline" color="textSecondary">
                    Seasons UID
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {product.seasonsUID}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="overline" color="textSecondary">
                    Previous Warehouse Location
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {product?.warehouseLocation?.barcode || "Unknown"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <RemoveWrapper>
            <IconButton aria-label="close" onClick={() => onRemove?.(product.id)}>
              <CloseIcon />
            </IconButton>
          </RemoveWrapper>
        </Box>
      </Paper>
      <StowProductInfoReports product={product} />
    </Box>
  )
}

const RemoveWrapper = styled.div`
  position: relative;
  top: 0;
  right: 0;
`
