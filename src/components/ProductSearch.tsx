import React, { useEffect } from "react"
import { Grid, Box, CircularProgress, IconButton } from "@material-ui/core"
import { Button as MuiButton, TextField } from "@material-ui/core"
import { gql } from "apollo-boost"
import styled from "styled-components"
import { useState } from "react"
import { useLazyQuery } from "react-apollo"
import { Text } from "components"
import { colors } from "theme/colors"
import CloseIcon from "@material-ui/icons/Close"
import { SearchResultCard } from "layouts/Dashboard/SearchResultCard"

const SEARCH = gql`
  query Search($query: String!) {
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

export const ProductSearch: React.FC = () => {
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [openSearch, setOpenSearch] = useState(false)
  const [search, { data }] = useLazyQuery(SEARCH)
  const [selectedProducts, setSelectedProducts] = useState([] as any)

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
  const resultsEmpty = selectedProducts.length > 0

  useEffect(() => {
    if (results) {
      setOpenSearch(true)
    }
  }, [results])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box mt={2} flexDirection="row">
          <Box flex={1}>
            <TextField
              fullWidth
              onChange={event => setValue(event.target.value)}
              placeholder="Search products, brands &amp; users"
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
                        const alreadyIncluded = !!selectedProducts.find((p: any) => p.data?.id === result.data?.id)
                        return (
                          <Box
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setSelectedProducts([
                                ...(alreadyIncluded
                                  ? selectedProducts.filter((p: any) => p.data?.id !== result.data?.id)
                                  : selectedProducts.concat([result])),
                              ])
                            }
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
      </Grid>
      <Grid item xs={6}>
        <SavedProducts mt={2} resultsEmpty={resultsEmpty}>
          {resultsEmpty ? (
            <>
              {selectedProducts.map(product => {
                return (
                  <Box style={{ position: "relative" }}>
                    <CloseWrapper>
                      <IconButton
                        aria-label="close"
                        onClick={() =>
                          setSelectedProducts([...selectedProducts.filter((p: any) => p.data?.id !== product.data?.id)])
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </CloseWrapper>
                    <SearchResultCard result={product} />
                  </Box>
                )
              })}
            </>
          ) : (
            <Box style={{ padding: "18.5px 14px" }}>
              <Text variant="h6">Added products will appear here</Text>
            </Box>
          )}
        </SavedProducts>
      </Grid>
    </Grid>
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
  box-sizing: border-box;
  border-radius: 4px;
  max-height: 300px;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
`

const SavedProducts = styled(Box)<{ resultsEmpty: boolean }>`
  border-radius: 4px;
  border: 1px solid #d7d6d7;
  background-color: ${p => (p.resultsEmpty ? "transparent" : colors.white95)};
`
