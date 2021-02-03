import React, { useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  Box,
  Button as MuiButton,
  CircularProgress,
  Drawer,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
  TextField,
  Divider,
} from "@material-ui/core"
import styled from "styled-components"
import { Search as SearchIcon, XCircle as XIcon } from "react-feather"
import { useLazyQuery } from "react-apollo"
import gql from "graphql-tag"
import { colors } from "theme/colors"
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

const Button = styled(MuiButton)`
  padding: 10px 8px;
  justify-content: flex-start;
  text-transform: none;
  font-size: 18px;
  letter-spacing: 0;
  width: 100%;
  color: ${colors.black50};

  &.active {
    color: ${colors.white100};
    font-weight: medium;
  }
`

function Search() {
  const classes = useStyles()
  const [value, setValue] = useState("")
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [search, { loading, data }] = useLazyQuery(SEARCH)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSearch = async () => {
    try {
      setLoading(true)

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

  return (
    <>
      <Button color="primary" onClick={handleOpen} startIcon={<SearchIcon />}>
        Search
      </Button>
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
            <Box mt={2} display="flex" flexDirection="row">
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
