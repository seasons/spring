// Packages
import React from "react"
import { Admin, Resource } from "react-admin"
import { ApolloProvider } from "react-apollo"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { createMuiTheme } from "@material-ui/core/styles"
import get from "lodash/get"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"

// Components
import { BrandList } from "./Components/Brands"
import { CategoryList } from "./Components/Categories"
import { ProductList, ProductEdit } from "./Components/Products"
import { MemberList } from "./Components/Members"

// Utilities
import overridenQueries from "./Queries"
import { ProductCreate } from "./Components/Products/ProductCreate"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "http://localhost:4466/monsoon/dev",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJtb25zb29uQHN0YWdpbmciLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTg1MTc3ODA3LCJleHAiOjE1ODU3ODI2MDd9.pdQ4pSkj1lBk_BA2_NVrvFNAgt6bqIaPRuK5_n33jHM"
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }
  } catch (e) {
    console.error("no access token present!")
    return {
      headers,
    }
  }
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, link]),
})

const enhanceBuildQuery = buildQuery => introspectionResults => (fetchType, resourceName, params) => {
  const fragment = get(overridenQueries, `${resourceName}.${fetchType}`)

  return buildQuery(introspectionResults)(fetchType, resourceName, params, fragment)
}

const theme = createMuiTheme({
  palette: {
    type: "dark", // Switching the dark mode on is a single property value change.
  },
})

class App extends React.Component {
  state = { dataProvider: null }

  componentDidMount() {
    buildOpenCrudProvider({
      client,
      buildQuery: enhanceBuildQuery(buildQuery),
    } as any).then(dataProvider => this.setState({ dataProvider }))
  }

  render() {
    const { dataProvider } = this.state

    if (!dataProvider) {
      return <div>Loading</div>
    }

    return (
      <ApolloProvider client={client}>
        <Admin theme={theme} dataProvider={dataProvider}>
          <Resource name="Brand" list={BrandList} />
          <Resource name="Category" list={CategoryList} />
          <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate} />
          <Resource name="User" list={MemberList} />
        </Admin>
      </ApolloProvider>
    )
  }
}

export default App
