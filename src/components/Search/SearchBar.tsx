import { Box, Button, TextField, styled } from "@material-ui/core"
import React, { useState } from "react"

import { connectAutoComplete } from "react-instantsearch-dom"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { SearchResultCard } from "./SearchResultCard"
import { useHistory } from "react-router-dom"
import { SearchProvider } from "./SearchProvider"
import { StringParam, useQueryParam } from "use-query-params"

const StyledTextField = styled(TextField)({
  [`& fieldset`]: {
    borderRadius: "10em",
    border: "none",
  },
})

const StyledAutocomplete = styled(Autocomplete)({
  listbox: {
    marginTop: "10px",
  },
})

const StyledButton = styled(Button)({
  root: {
    width: "80px",
    height: "40px",
  },
})

const SearchContainer = styled(Box)({
  borderRadius: "10em",
  border: "1px solid #E9E9EB",
  display: "flex",
  height: "40px",
  padding: "5px 10px",
  alignItems: "center",
})

const AutoComplete = ({ hits, currentRefinement, refine }) => {
  const history = useHistory()
  const [query] = useQueryParam("q", StringParam)
  const [value, setValue] = useState(query)

  return (
    <Box m={2} width="100%">
      <StyledAutocomplete
        options={[
          ...(currentRefinement.length > 0
            ? [
                {
                  kindOf: "Search",
                  query: value,
                },
              ]
            : []),
          ...hits,
        ]}
        fullWidth
        getOptionLabel={(option: any) => {
          switch (option.kindOf) {
            case "Brand":
            case "Product":
              return option.name
            case "PhysicalProduct":
              return option.productName
            case "Customer":
              return `${option.user.firstName} ${option.user.lastName}`
            case "Search":
              return option.query
            case "ShopifyProductVariant":
              return option.displayName
          }

          return option.name
        }}
        onChange={(e, result: any) => {
          let url = ""

          if (!result) {
            return
          }

          switch (result.kindOf) {
            case "PhysicalProduct":
              url = `/inventory/product/variant/physicalProduct/${result.objectID}/manage`
              break
            case "Product":
              url = `/inventory/products/${result.objectID}`
              break
            case "Customer":
              url = `/members/${result.objectID}/account`
              break
            case "Brand":
              url = `/inventory/brands/${result.objectID}`
              break
            case "Search":
              url = `/search?q=${value}`
              break
            case "ShopifyProductVariant":
              url = ""
              break
          }

          if (url) {
            history.push(url)
          }
        }}
        freeSolo
        autoHighlight
        openOnFocus={false}
        renderOption={(hit: any) => {
          return <SearchResultCard result={{ data: hit, kindOf: hit.kindOf }} />
        }}
        renderInput={params => (
          <SearchContainer>
            <StyledTextField
              placeholder="Search products, brands & users"
              variant="outlined"
              {...params}
              InputProps={{
                ...params.InputProps,
                onChange: e => {
                  const val = e.currentTarget.value

                  refine(val)
                  setValue(val)
                },
              }}
              inputProps={{
                ...params.inputProps,
                value,
              }}
            />
            <StyledButton
              color="primary"
              variant="contained"
              onClick={() => {
                history.push(`/search?query=${currentRefinement}`)
              }}
            >
              Search
            </StyledButton>
          </SearchContainer>
        )}
      />
    </Box>
  )
}

interface SearchBarProps {
  handleSearch?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const CustomAutocomplete = connectAutoComplete(AutoComplete)

  return (
    <Box mt={2} display="flex" flexDirection="row">
      <SearchProvider>
        <CustomAutocomplete />
      </SearchProvider>
    </Box>
  )
}
