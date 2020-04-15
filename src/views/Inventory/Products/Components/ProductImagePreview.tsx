import React from "react"

import { Box, styled } from "@material-ui/core"

import { Spacer } from "components"

export interface ProductImagePreviewProps {
  record?: any
}

export const ProductImagePreview: React.FC<ProductImagePreviewProps> = ({ record }) => {
  if (!record?.src) {
    return null
  }
  return (
    <ImageContainer>
      <Spacer mt={1} />
      <img src={record.src} alt="" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
    </ImageContainer>
  )
}

const ImageContainer = styled(Box)({
  width: "100%",
  height: "auto",
})
