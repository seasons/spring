import React from "react"
import { Box, IconButton } from "@material-ui/core"
import styled from "styled-components"
import CloseIcon from "@material-ui/icons/Close"
import { ProductTile } from "./ProductTile"

export const ProductSelects: React.FC<{ selectedProducts: any[]; setSelectedProducts: (products: any[]) => void }> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  return (
    <Box mt={2}>
      {selectedProducts.map(product => {
        return (
          <Box style={{ position: "relative" }}>
            <RemoveWrapper>
              <IconButton
                aria-label="remove"
                onClick={() =>
                  setSelectedProducts([...selectedProducts.filter((p: any) => p.data?.id !== product.data?.id)])
                }
              >
                <CloseIcon />
              </IconButton>
            </RemoveWrapper>
            <ProductTile product={product} />
          </Box>
        )
      })}
    </Box>
  )
}

const RemoveWrapper = styled("div")`
  position: absolute;
  top: 0;
  right: 15px;
  z-index: 40;
`
