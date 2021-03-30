import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"

const { REACT_APP_ALGOLIA_ACCOUNT_ID, REACT_APP_ALGOLIA_KEY } = process.env

export const searchClient = algoliasearch(REACT_APP_ALGOLIA_ACCOUNT_ID!, REACT_APP_ALGOLIA_KEY!)

interface SearchProviderProps {
  autocomplete?: boolean
  indexName?: string
}

export const SearchProvider: React.FC<SearchProviderProps> = props => {
  const { autocomplete, children } = props
  const baseName = props.indexName || process.env.REACT_APP_ALGOLIA_INDEX || "admin_staging"

  const index = baseName + (autocomplete ? "_query_suggestions" : "")
  return (
    <InstantSearch searchClient={searchClient} indexName={index}>
      {children}
    </InstantSearch>
  )
}
