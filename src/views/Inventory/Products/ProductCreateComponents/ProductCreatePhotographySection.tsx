import React from "react"

import { Box, GridList, GridListTile } from "@material-ui/core"

import { Spacer, Text } from "components"
import { Dropzone } from "../Components"

export interface ProductCreatePhotographySectionProps {
  numImages: number
  onReceivedImageFile: (any) => void
}

export const ProductCreatePhotographySection: React.FC<ProductCreatePhotographySectionProps> = ({
  numImages,
  onReceivedImageFile,
}) => {
  return (
    <>
      <Text variant="h4">Photography</Text>
      <Spacer mt={2} />
      <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
        <GridList cellHeight={516} cols={1}>
          {[...Array(numImages)].map((_, index) => (
            <GridListTile key={index}>
              <Dropzone onReceivedFile={onReceivedImageFile} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
      <Spacer mt={9} />
    </>
  )
}
