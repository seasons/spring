import React from "react"
import { useLazyQuery } from "react-apollo"
import styled from "styled-components"
import { gql } from "apollo-boost"

import { Box, CircularProgress, IconButton, Button as MuiButton, TextField } from "@material-ui/core"
import { SearchResultCard } from "components/Search/SearchResultCard"
import CloseIcon from "@material-ui/icons/Close"

export enum SearchType {
  PRODUCT,
  SHOPIFY_PRODUCT_VARIANT,
}

type Props<R> = {
  onResultItemClicked: (result: R) => void
  onFilterResults?: (results: R[] | null) => R[] | undefined | null
  searchType: SearchType
  placeholder: string
}

// TODO: refactor to share query, and select fragment on SearchType
const QUERIES = {
  [SearchType.PRODUCT]: gql`
    query ProductSearch($query: String!) {
      search(query: $query, options: { includeTypes: [Product] }) {
        kindOf
        __typename
        data {
          __typename
          ... on ProductSearchResultData {
            id
            slug
            name
            brandName
            image
          }
        }
      }
    }
  `,
  [SearchType.SHOPIFY_PRODUCT_VARIANT]: gql`
    query ShopifyProductVariantSearch($query: String!) {
      search(query: $query, options: { includeTypes: [ShopifyProductVariant] }) {
        kindOf
        __typename
        data {
          __typename
          ... on ShopifyProductVariantSearchResultData {
            id
            brandID
            externalID
            displayName
            selectedOptions {
              name
              value
            }
            title
            image
          }
        }
      }
    }
  `,
}

export const SearchInput = ({ onResultItemClicked, searchType, placeholder, onFilterResults }: Props<any>) => {
  const [isLoading, setLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [openSearch, setOpenSearch] = React.useState(false)
  const [search, { data }] = useLazyQuery(QUERIES[searchType])

  const handleSearch = async () => {
    try {
      setLoading(true)
      setOpenSearch(true)
      search({
        variables: {
          query: inputValue,
        },
      })
    } catch (error) {
      console.log("error searching", error)
      //TODO: add snackbar
    } finally {
      setLoading(false)
    }
  }

  const results = data?.search

  React.useEffect(() => {
    if (results) {
      setOpenSearch(true)
    }
  }, [results])

  return (
    <Box flexDirection="row">
      <Box flex={1}>
        <TextField
          fullWidth
          onChange={event => setInputValue(event.target.value)}
          placeholder={placeholder}
          value={inputValue}
          variant="outlined"
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <MuiButton color="primary" size="small" onClick={handleSearch}>
          Search
        </MuiButton>
      </Box>
      <Box style={{ position: "relative", width: "100%" }}>
        {(openSearch || isLoading) && (
          <>
            <CloseWrapper>
              <IconButton aria-label="close" onClick={() => setOpenSearch(false)}>
                <CloseIcon />
              </IconButton>
            </CloseWrapper>
            <ResultsWrapped>
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {(onFilterResults ? onFilterResults(results) : results)?.map((result: any, index: number) => {
                    return (
                      <Box
                        key={(result?.data?.id || "") + index}
                        style={{ cursor: "pointer", backgroundColor: "white" }}
                        onClick={() => {
                          onResultItemClicked(result)
                        }}
                      >
                        <Box style={{ pointerEvents: "none" }}>
                          <SearchResultCard result={result} />
                        </Box>
                      </Box>
                    )
                  })}
                </>
              )}
            </ResultsWrapped>
          </>
        )}
      </Box>
    </Box>
  )
}

const CloseWrapper = styled("div")`
  position: absolute;
  top: 0;
  right: 15px;
  z-index: 40;
`

const ResultsWrapped = styled("div")`
  border: 1px solid #d7d6d7;
  background-color: white;
  box-sizing: border-box;
  border-radius: 4px;
  max-height: 300px;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  z-index: 39;
`
