import React from "react"
import { Box } from "@material-ui/core"
import { Image } from "components/Image"
import { ImagesField, ImageSize, ImagesFieldProps } from "./ImagesField"

export const ImageField: React.FC<ImagesFieldProps> = ({ label, record = {}, source, size = "medium" }) => {
  const url = record[source]?.url
  return (
    <Box display="flex" flexDirection="row">
      {url && <Image key={url} url={url} size={size} />}
    </Box>
  )
}
