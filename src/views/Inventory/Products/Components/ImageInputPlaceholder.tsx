import React from "react"
import { Box, styled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { UploadFileIcon } from "icons"

export const ImageInputPlaceholder: React.FC = props => {
  return (
    <Wrapper display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <UploadFileIcon />
      <Spacer mt={2} />
      <Text variant="h6">Select files to upload</Text>
      <Spacer mt={0.5} />
      <Text variant="h6" opacity={0.5}>
        or drag and drop, copy and paste files
      </Text>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  background: "#f6f6f6",
  borderRadius: 4,
  height: 500,
})
