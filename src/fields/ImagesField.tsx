import React from "react"
import { Box } from "@material-ui/core"
import { Image } from "components/Image"

export type ImageSize = "small" | "medium" | "large"
export interface ImagesFieldProps {
  label?: String
  record?: any
  source: any
  size?: ImageSize
}

export const ImagesField: React.FC<ImagesFieldProps> = ({ label, record = {}, source, size = "medium" }) => {
  const images = record[source] || []
  return (
    <Box display="flex" flexDirection="row">
      {images.map(image => {
        const { url } = image
        return <Image key={url} url={url} size={size} />
      })}
    </Box>
  )
}
