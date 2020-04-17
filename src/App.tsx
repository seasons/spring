import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { AppLoader } from "components"
import { createBrowserHistory } from "history"
import get from "lodash/get"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"
import polyglotI18nProvider from "ra-i18n-polyglot"
import React from "react"
import { convertLegacyDataProvider, DataProviderContext, Resource, TranslationProvider } from "react-admin"
import { ApolloProvider } from "react-apollo"
import { Provider as StoreProvider } from "react-redux"
import { renderRoutes } from "react-router-config"
import { Router } from "react-router-dom"

import { ThemeProvider as SCThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/core"
import { StylesProvider } from "@material-ui/core/styles"
import englishMessages from "./i18n/en"
import overridenQueries from "./queries"
import routes from "./routes"
import configureStore from "./store/adminStore"
import { theme } from "./theme/theme"

const link = new HttpLink({
  uri: "http://localhost:4000",
  // uri: "https://monsoon-staging.seasons.nyc",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const userSession = JSON.parse(localStorage.userSession)
    const { token } = userSession
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  } catch (e) {
    console.error("no access token present!")
    return {
      headers,
    }
  }
})

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    console.log("networkError", networkError)
    // User access token has expired
    // if (networkError. === 401) {
    // }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, link]),
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
    const isAuthenticated = !!localStorage.getItem("userSession")

    if (!isAuthenticated && window.location?.pathname != "/login") {
      window.location.href = "/login"
    }

    buildOpenCrudProvider({
      client,
      buildQuery: enhanceBuildQuery(buildQuery),
    } as any).then(dataProvider => this.setState({ dataProvider: convertLegacyDataProvider(dataProvider) }))
  }

  render() {
    const { dataProvider } = this.state

    if (!dataProvider) {
      return <AppLoader />
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
              <StylesProvider injectFirst>
                <SCThemeProvider theme={theme}>
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
                </SCThemeProvider>
              </StylesProvider>
            </ApolloProvider>
          </DataProviderContext.Provider>
        </StoreProvider>
      </TranslationProvider>
    )
  }
}

export default App
