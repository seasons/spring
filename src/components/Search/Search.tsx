import React, { useEffect, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Box, CircularProgress, Drawer, IconButton, SvgIcon, Typography, makeStyles } from "@material-ui/core"

import { XCircle as XIcon } from "react-feather"
import { useLazyQuery } from "react-apollo"
import gql from "graphql-tag"
import { SearchResultCard } from "./SearchResultCard"

const useStyles = makeStyles(() => ({
  drawer: {
    width: 500,
    maxWidth: "100%",
  },
}))

const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      kindOf
      __typename
      data {
        __typename
        ... on PhysicalProductSearchResultData {
          id
          inventoryStatus
          barcode
          productName
          seasonsUID
        }
        ... on ProductSearchResultData {
          id
          slug
          name
          brandName
          image
          description
          variantsCount
          physicalProductsCount
        }
      }
    }
  }
`

function Search({ open, query }) {
  const classes = useStyles()
  const [value, setValue] = useState("")
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [search, { loading, data }] = useLazyQuery(SEARCH)

  const handleSearch = async searchQuery => {
    try {
      setLoading(true)

      search({
        variables: {
          query: searchQuery,
        },
      })
    } catch (error) {
      //TODO: add snackbar
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setOpen(open)
  }, [open])

  useEffect(() => {
    setValue(query)
    handleSearch(query)
  }, [query, handleSearch])

  const handleClose = () => {
    setOpen(false)
  }

  const results = data?.search

  return (
    <>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        ModalProps={{ BackdropProps: { invisible: true } }}
        onClose={handleClose}
        open={isOpen}
        variant="temporary"
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" color="textPrimary">
                Search
              </Typography>
              <IconButton onClick={handleClose}>
                <SvgIcon fontSize="small">
                  <XIcon />
                </SvgIcon>
              </IconButton>
            </Box>

            <Box mt={4}>
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>{results && (results || []).map((result: any) => <SearchResultCard result={result} />)}</>
              )}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  )
}

export default Search
