import React from "react"
import { Box, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

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
    <Box mb={2}>
      <Autocomplete
        id="combo-box-demo"
        options={locations || []}
        value={location}
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
  )
}
