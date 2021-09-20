import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Box, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { options } from "date-fns/locale/af"

interface WarehouseLocationsDropdownProps {
  locations?: any[]
  location?: string
  onChange?: (text: string) => void
}
export const WarehouseLocationsDropdown: React.FC<WarehouseLocationsDropdownProps> = ({
  location,
  locations,
  onChange,
}) => {
  return (
    <>
      <Box mb={2}>
        <Autocomplete
          id="combo-box-demo"
          options={locations || []}
          onChange={e => {
            const id = (e.currentTarget as any).innerText
            onChange?.(id)
          }}
          getOptionSelected={(option, value) => {
            return location === option.barcode
          }}
          getOptionLabel={option => option.barcode || ``}
          renderInput={params => {
            return <TextField {...params} label="Select Location" variant="outlined" />
          }}
          clearOnBlur={false}
          autoSelect
        />
      </Box>
    </>
  )
}
