// in src/App.js
import React from "react"
import { Admin, Resource } from "react-admin"
import get from "lodash/get"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"
import { ApolloClient } from "apollo-client"
import { BrandList } from "./Brands"
import { CategoryList } from "./Categories"
import { ProductList, ProductEdit } from "./Components/Products"
import overridenQueries from "./Queries"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "http://localhost:4466",
})
const client = new ApolloClient({
  cache,
  link,
})

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
      <Admin dataProvider={dataProvider}>
        <Resource name="Brand" list={BrandList} />
        <Resource name="Category" list={CategoryList} />
        <Resource name="Product" list={ProductList} edit={ProductEdit} />
      </Admin>
    )
  }
}

export default App
