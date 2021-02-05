import { Box, Button, TextField, styled } from "@material-ui/core"
import React, { useEffect, useState } from "react"

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

  useEffect(() => {
    if (currentRefinement.length > 0) {
      setValue(currentRefinement)
    }
  }, [currentRefinement])

  useEffect(() => {
    if (query) {
      setValue(query)
    }
  })

  console.log("value: ", value, " currentRefinement: ", currentRefinement)

  return (
    <Box m={2} width="100%">
      <StyledAutocomplete
        options={[
          ...(currentRefinement.length > 0
            ? [
                {
                  kindOf: "Search",
                  query: currentRefinement,
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
              url = `/search?q=${currentRefinement}`
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
              {...params}
              onChange={(event: any) => {
                refine(event.currentTarget.value)
                setValue(event.currentTarget.value)
              }}
              value={value}
              defaultValue={value}
              placeholder="Search products, brands & users"
              variant="outlined"
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
