import React from "react"
import { get } from "lodash"
import styled from "styled-components"
import { Box } from "@material-ui/core"

interface imagesFieldIfc {
  record?: object
  source: string
  label?: string
}

const Image = styled.img`
  margin-right: 5px;
`

export const ProductItemsField: React.FC<imagesFieldIfc> = ({ record, source, label }) => {
  let images: Array<any> = []
  let products: Array<Object> = get(record, "products", [])

  // eslint-disable-next-line
  products.map(product => {
    const productImages = get(product, source, [{ id: "", filename: "" }])[0]
    images.push(productImages)
  })

  return (
    <Box>
      {images.map(image => {
        const { url } = image
        return <Image key={image.url} src={url} width={85} height={107} alt={image.filename} />
      })}
    </Box>
  )
}
