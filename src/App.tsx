// in src/App.js
import React from "react"
import { Admin, Resource } from "react-admin"
import { ApolloProvider } from "react-apollo"
import get from "lodash/get"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"
import { ApolloClient } from "apollo-client"
import { BrandList } from "./Brands"
import { CategoryList } from "./Categories"
import { ProductList, ProductEdit } from "./Components/Products"
import overridenQueries from "./Queries"
import { Dashboard } from "./layouts/Dashboard"
import { ProductCreate } from "./Components/Products/ProductCreate"
import { ReservationsList } from "./Reservations"
import { UserList } from "./users"
import { CustomerList } from "./Customers"
import { PackageList } from "./Packages"
import { DeviasTheme } from "./theme"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "http://localhost:4466/monsoon/dev",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJtb25zb29uQHN0YWdpbmciLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTgyMjIyMTQ0LCJleHAiOjE1ODI4MjY5NDR9.__c7FkRSV9oER6SaRtaj2C3cQhE2DZKnaJ6T2wNFAms"
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }
  } catch (e) {
    return {
      headers,
    }
  }
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, link]),
})

// Override some queries with our own queries
const enhanceBuildQuery = buildQuery => introspectionResults => (fetchType, resourceName, params) => {
  const fragment = get(overridenQueries, `${resourceName}.${fetchType}`)

  return buildQuery(introspectionResults)(fetchType, resourceName, params, fragment)
}

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
        <Admin dataProvider={dataProvider} theme={DeviasTheme} layout={Dashboard}>
          <Resource name="Brand" list={BrandList} />
          <Resource name="Category" list={CategoryList} />
          <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate} />
          <Resource name="Reservation" list={ReservationsList} />
          <Resource name="User" list={UserList} />
          <Resource name="Customer" list={CustomerList} />
          <Resource name="Package" list={PackageList} />
          <Resource name="PhysicalProduct" />
        </Admin>
      </ApolloProvider>
    )
  }
}

export default App
