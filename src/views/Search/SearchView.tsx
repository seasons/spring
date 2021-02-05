import React from "react"
import { Box } from "@material-ui/core"
import { SearchProvider } from "components/Search/SearchProvider"
import { Hits, connectSearchBox } from "react-instantsearch-dom"
import { useQueryParam, StringParam } from "use-query-params"
import { SearchResultCard } from "components/Search/SearchResultCard"
import { Separator } from "components"

const VirtualSearchBox = connectSearchBox(() => null)

const Hit = ({ hit }) => {
  return (
    <>
      <Box p={2}>
        <SearchResultCard result={{ data: hit, kindOf: hit.kindOf }} />
      </Box>
      <Separator />
    </>
  )
}

export const SearchView = () => {
  const [query] = useQueryParam("q", StringParam)

  console.log("query", query)

  return (
    <Box>
      <SearchProvider>
        <VirtualSearchBox defaultRefinement={query} />
        <Separator />
        <Hits hitComponent={Hit} />
      </SearchProvider>
    </Box>
  )
}
