import React from "react"
import { get } from "lodash"
import styled from "styled-components"
import { Box } from "@material-ui/core"

interface imagesFieldIfc {
  record?: object
  source: string
  label?: string
}

interface imageObject {
  id: string
  filename: string
}

const Image = styled.img`
  margin-right: 5px;
`

export const ProductItemsField: React.FC<imagesFieldIfc> = ({ record, source, label }) => {
  let images: Array<imageObject> = []
  let products: Array<Object> = get(record, "products", [])

  products.map(product => {
    const productImages: imageObject = get(product, source, [{ id: "", filename: "" }])[0]
    images.push(productImages)
  })

  return (
    <Box>
      {images.map(image => {
        const { url } = get(image, "thumbnails.large", { url: "", width: 0, height: 0 })
        return <Image key={image.id} src={url} width={85} height={107} alt={image.filename} />
      })}
    </Box>
  )
}
