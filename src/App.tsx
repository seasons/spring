// Packages
import React from "react"
import { convertLegacyDataProvider, DataProviderContext, Resource, TranslationProvider } from "react-admin"
import { ApolloProvider } from "react-apollo"
import { Router } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import { createBrowserHistory } from "history"
import { Provider as StoreProvider } from "react-redux"
import get from "lodash/get"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"
import polyglotI18nProvider from "ra-i18n-polyglot"
import { ApolloClient } from "apollo-client"
import overridenQueries from "./queries"
import { theme } from "./theme/theme"
import { ThemeProvider } from "@material-ui/core"
import configureStore from "./store/adminStore"
import routes from "./routes"
import englishMessages from "./i18n/en"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "http://localhost:4466/monsoon/dev",
  // uri: "https://monsoon-staging.seasons.nyc",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJtb25zb29uQHN0YWdpbmciLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTg1NzYyMDc5LCJleHAiOjE1ODYzNjY4Nzl9.kqBGhmQU1k14i9Ku4dYnEZm3xt9wz2H3bQ5GcW_AaK0"
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

// Override some queries with our own queries
const enhanceBuildQuery = buildQuery => introspectionResults => (fetchType, resourceName, params) => {
  const fragment = get(overridenQueries, `${resourceName}.${fetchType}`)

  return buildQuery(introspectionResults)(fetchType, resourceName, params, fragment)
}

const history = createBrowserHistory()

const i18nProvider = polyglotI18nProvider(locale => {
  return englishMessages
})

class App extends React.Component {
  state = { dataProvider: null }

  componentDidMount() {
    buildOpenCrudProvider({
      client,
      buildQuery: enhanceBuildQuery(buildQuery),
    } as any).then(dataProvider => this.setState({ dataProvider: convertLegacyDataProvider(dataProvider) }))
  }

  render() {
    const { dataProvider } = this.state

    if (!dataProvider) {
      return <div>Loading</div>
    }

    const store = configureStore({
      authProvider: () => Promise.resolve(),
      dataProvider,
      history,
    })

    return (
      <TranslationProvider i18nProvider={i18nProvider}>
        <StoreProvider store={store}>
          <DataProviderContext.Provider value={dataProvider}>
            <ApolloProvider client={client}>
              <ThemeProvider theme={theme}>
                <Resource name="Product" intent="registration" />
                <Resource name="Customer" intent="registration" />
                <Resource name="Category" intent="registration" />
                <Resource name="Brand" intent="registration" />
                <Resource name="User" intent="registration" />
                <Resource name="Reservation" intent="registration" />
                <Resource name="Size" intent="registration" />
                <Resource name="Tag" intent="registration" />
                <Router history={history}>{renderRoutes(routes)}</Router>
              </ThemeProvider>
            </ApolloProvider>
          </DataProviderContext.Provider>
        </StoreProvider>
      </TranslationProvider>
    )
  }
}

export default App
