import { Box, styled } from "@material-ui/core"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { Spacer, Text } from "components"
import { UploadFileIcon } from "icons"

export interface DropzoneProps {
  onReceivedFile: (any) => void
}

export const Dropzone: React.FC<DropzoneProps> = ({ onReceivedFile }) => {
  const [imagePreview, setImagePreview] = useState("")
  const onDrop = useCallback(
    acceptedFiles => {
      console.log("GOT FILES:", acceptedFiles)
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onReceivedFile(file)
        setImagePreview(URL.createObjectURL(file))
      }
    },
    [onReceivedFile]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Wrapper display="flex" flexDirection="column" justifyContent="center" alignItems="center" {...getRootProps()}>
      <input {...getInputProps()} />
      {imagePreview ? (
        <Box justifyContent="center" alignItems="center">
          <img src={imagePreview} alt="Preview" style={{ minWidth: "100%", minHeight: "100%" }} />
        </Box>
      ) : (
        <>
          <UploadFileIcon />
          <Spacer mt={2} />
          <Text variant="h6">Select files to upload</Text>
          <Spacer mt={0.5} />
          <Text variant="h6" opacity={0.5}>
            or drag and drop, copy and paste files
          </Text>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  background: "#f6f6f6",
  borderRadius: 4,
  height: 500,
})
