import React from "react"
import { Box, IconButton } from "@material-ui/core"
import styled from "styled-components"
import CloseIcon from "@material-ui/icons/Close"
import { ProductTile } from "./ProductTile"

export const ProductSelects: React.FC<{
  selectedProductIDs: string[]
  products: any[]
  setSelectedProductIDs: (IDs: string[]) => void
}> = ({ selectedProductIDs, setSelectedProductIDs, products }) => {
  return (
    <Box mt={2} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {products?.map(product => {
        return (
          <Box style={{ position: "relative", width: "150px", padding: "4px" }} key={product.id}>
            <RemoveWrapper>
              <IconButton
                aria-label="remove"
                onClick={() => setSelectedProductIDs([...selectedProductIDs.filter((p: any) => p !== product.id)])}
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
  top: 4px;
  right: 4px;
  z-index: 2;
`
