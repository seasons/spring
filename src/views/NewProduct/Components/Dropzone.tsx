import React, { Component, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Button, Container, Grid, styled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { UploadFileIcon } from "icons"

export interface DropzoneProps {
  onReceivedFile: (any) => void
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onReceivedFile,
}) => {
  const [imagePreview, setImagePreview] = useState("")
  const onDrop = useCallback(acceptedFiles => {
    console.log("GOT FILES:", acceptedFiles)
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onReceivedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }, [onReceivedFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Wrapper
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
      />
      {imagePreview
        ? (
          <div style={{ display: 'block', width: 'auto', height: '100%' }}>
            <img src={imagePreview} alt="Preview" />
          </div>
        )
        : (
          <>
            <UploadFileIcon />
            <Spacer mt={2} />
            <Text variant="h6">Select files to upload</Text>
            <Spacer mt={0.5} />
            <Text variant="h6" opacity={0.5}>or drag and drop, copy and paste files</Text>
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