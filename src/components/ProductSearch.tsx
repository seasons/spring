import React, { useEffect } from "react"
import { Box, CircularProgress, IconButton } from "@material-ui/core"
import { Button as MuiButton, TextField } from "@material-ui/core"
import { gql } from "apollo-boost"
import styled from "styled-components"
import { useState } from "react"
import { useLazyQuery } from "react-apollo"
import { colors } from "theme/colors"
import CloseIcon from "@material-ui/icons/Close"
import { SearchResultCard } from "layouts/Dashboard/SearchResultCard"

const PRODUCT_SEARCH = gql`
  query ProductSearch($query: String!) {
    search(query: $query) {
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
`

export const ProductSearch: React.FC<{
  selectedProductIDs: string[]
  setSelectedProductIDs: (IDs: string[]) => void
}> = ({ selectedProductIDs, setSelectedProductIDs }) => {
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [openSearch, setOpenSearch] = useState(false)
  const [search, { data }] = useLazyQuery(PRODUCT_SEARCH)

  const handleSearch = async () => {
    try {
      setLoading(true)
      setOpenSearch(true)
      search({
        variables: {
          query: value,
        },
      })
    } catch (error) {
      //TODO: add snackbar
    } finally {
      setLoading(false)
    }
  }

  const results = data?.search
  useEffect(() => {
    if (results) {
      setOpenSearch(true)
    }
  }, [results])

  return (
    <Box flexDirection="row">
      <Box flex={1}>
        <TextField
          fullWidth
          onChange={event => setValue(event.target.value)}
          placeholder="Search products or brands"
          value={value}
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
                  {results?.map((result: any) => {
                    const alreadyIncluded = !!selectedProductIDs.find((id: string) => id === result?.data?.id)
                    return (
                      <Box
                        key={result?.data?.id}
                        style={{ cursor: "pointer", backgroundColor: "white" }}
                        onClick={() => {
                          if (!alreadyIncluded) {
                            setSelectedProductIDs([...selectedProductIDs.concat([result.data.id])])
                          }
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
