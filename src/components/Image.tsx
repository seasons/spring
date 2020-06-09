import React from "react"
import { Box } from "@material-ui/core"
import { colors } from "theme"

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

export type ImageSize = "small" | "medium" | "large"

interface ImageProps {
  size: ImageSize
  url: string
}

export const Image: React.FC<ImageProps> = ({ size, url }) => {
  return (
    <Box {...sizes[size]} mr={1} bgcolor={colors.black04} key={url}>
      <img {...sizes[size]} src={url} />
    </Box>
  )
}
