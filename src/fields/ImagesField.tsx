import React from "react"
import { Box } from "@material-ui/core"
import { colors } from "theme"

type ImageSize = "small" | "medium" | "large"

interface ImagesFieldProps {
  label?: String
  record?: any
  source: any
  size?: ImageSize
}

export const ImagesField: React.FC<ImagesFieldProps> = ({ label, record = {}, source, size = "medium" }) => {
  const sizes = {
    small: {
      width: 30,
      height: 37.5,
    },
    medium: {
      width: 50,
      height: 62.5,
    },
    large: {
      width: 80,
      height: 100,
    },
  }
  const images = record[source] || []
  return (
    <Box display="flex" flexDirection="row">
      {images.map(image => {
        const { url } = image
        return (
          <Box {...sizes[size]} mr={1} bgcolor={colors.black04}>
            <img key={image.id} {...sizes[size]} src={url} alt={image.url} />
          </Box>
        )
      })}
    </Box>
  )
}
