import { Button } from "@material-ui/core"
import { Box, TextField } from "@material-ui/core"
import React from "react"
import styled from "styled-components"

const StyledTextField = styled(TextField)``

export const SearchBar = ({ value, setValue, handleSearch }) => {
  return (
    <Box mt={2} display="flex" flexDirection="row">
      <Box flex={1}>
        <StyledTextField
          fullWidth
          onChange={event => setValue(event.target.value)}
          placeholder="Search products, brands &amp; users"
          value={value}
          variant="outlined"
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" size="medium" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  )
}
