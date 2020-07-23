import React, { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  Box,
  Button as MuiButton,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
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
import { Image } from "components"

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

  console.log("Data: ", data)
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
      <Tooltip title="Search">
        <Button color="primary" onClick={handleOpen}>
          <SvgIcon fontSize="small">
            <SearchIcon />
          </SvgIcon>
          Search
        </Button>
      </Tooltip>
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
            <Box mt={2}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={event => setValue(event.target.value)}
                placeholder="Search people &amp; places"
                value={value}
                variant="outlined"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button color="secondary" variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            <Box mt={4}>
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {results &&
                    (results || []).map((result: any) => {
                      const { data } = result

                      switch (result.kindOf) {
                        case "Product":
                          return (
                            <>
                              <Box display="flex" flexDirection="row">
                                <Box>
                                  <Image url={data.image} size="medium" />
                                </Box>
                                <Box ml={1} mb={2} flex={1}>
                                  <Link
                                    variant="h4"
                                    color="textPrimary"
                                    component={RouterLink}
                                    to={`/inventory/products/${data.id}`}
                                  >
                                    {data?.name}
                                  </Link>
                                  <Typography variant="body2" color="textPrimary">
                                    {data?.brandName}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box my={1}>
                                <Divider />
                              </Box>
                            </>
                          )
                        case "PhysicalProduct":
                          return (
                            <Box>
                              <Link
                                variant="h4"
                                color="textPrimary"
                                component={RouterLink}
                                to={`/inventory/product/variant/physicalProducts/${data.id}`}
                              >
                                {data?.seasonsUID}
                              </Link>
                              <Typography variant="body2" color="textPrimary">
                                {data?.barcode}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                {data?.productName}
                              </Typography>
                              <Box my={1}>
                                <Divider />
                              </Box>
                            </Box>
                          )

                        default:
                          return ""
                      }
                    })}
                </>
              )}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  )
}

export default Search
