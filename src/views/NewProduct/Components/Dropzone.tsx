import React, { Component, useState } from 'react'
import { Box, Button, Container, Grid, styled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { UploadFileIcon } from "icons"

export interface DropzoneProps {
  disabled?: boolean
  onReceivedFiles: any
}

export const Dropzone: React.FC<DropzoneProps> = ({
  disabled = false,
  onReceivedFiles,
}) => {
  const [highlight, setHighlight] = useState(false)
  let fileInputRef: any = React.createRef()

  const openFileDialog = () => {
    if (disabled) return
    fileInputRef.current.click()
  }

  const onFilesAdded = (evt) => {
    if (disabled) return
    const files = evt.target.files
    if (onReceivedFiles) {
      const array = fileListToArray(files)
      onReceivedFiles(array)
    }
  }

  const onDragOver = (evt) => {
    evt.preventDefault()
    if (disabled) return
    setHighlight(true)
  }

  const onDragLeave = () => {
    setHighlight(false)
  }

  const onDrop = (event) => {
    event.preventDefault()

    if (disabled) return

    const files = event.dataTransfer.files
    if (onFilesAdded) {
      const array = fileListToArray(files)
      onFilesAdded(array)
    }
    setHighlight(false)
  }

  const fileListToArray = (list) => {
    const array: any[] = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  return (
    <Wrapper
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAdded}
        style={{ opacity: 0 }}
      />
      <UploadFileIcon />
      <Spacer mt={2} />
      <Text variant="h6">Select files to upload</Text>
      <Spacer mt={0.5} />
      <Text variant="h6" opacity={0.5}>or drag and drop, copy and paste files</Text>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  background: "#f6f6f6",
  borderRadius: 4,
  height: 500,
})