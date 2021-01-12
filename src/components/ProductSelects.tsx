import React from "react"
import { Box, IconButton } from "@material-ui/core"
import styled from "styled-components"
import CloseIcon from "@material-ui/icons/Close"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { ProductTile } from "./ProductTile"

interface ProductSelectsProps {
  selectedProductIDs: string[]
  products: any[]
  setSelectedProductIDs: (IDs: string[]) => void
  type?: "remove" | "add"
}
export const ProductSelects: React.FC<ProductSelectsProps> = ({
  selectedProductIDs,
  setSelectedProductIDs,
  products,
  type = "remove",
}) => {
  let onClick
  let actionIcon
  switch (type) {
    case "remove":
      onClick = product => setSelectedProductIDs([...selectedProductIDs.filter((p: any) => p !== product.id)])
      actionIcon = <CloseIcon />
      break
    case "add":
      onClick = product => setSelectedProductIDs([...selectedProductIDs, product.id])
      actionIcon = <AddCircleIcon />
      break
  }
  return (
    <Box mt={2} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {products?.map(product => {
        return (
          <Box style={{ position: "relative", width: "150px", padding: "4px" }} key={product.id}>
            <RemoveWrapper>
              <IconButton aria-label={type} onClick={() => onClick(product)}>
                {actionIcon}
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
