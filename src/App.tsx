import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
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

import { ThemeProvider } from "@material-ui/core"

import englishMessages from "./i18n/en"
import overridenQueries from "./queries"
import routes from "./routes"
import configureStore from "./store/adminStore"
import { theme } from "./theme/theme"
import { Auth0Provider } from "utils/auth0"

const cache = new InMemoryCache()
const link = new HttpLink({
  // uri: "http://localhost:4466/monsoon/dev",
  uri: "https://monsoon-prisma-staging.herokuapp.com/monsoon/staging",
})

const auth0Config = {
  domain: "seasons-staging.auth0.com",
  clientId: "fcHPQx7KYqpkqI2yn31fcLgt7nuU2S5D",
}

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJtb25zb29uQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1ODY2NTU0NDYsImV4cCI6MTU4NzI2MDI0Nn0.SeRfFDz_TYckiuvG61Eom3sJXj-Eiq6ENr9nutSYsFI"
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
      return <AppLoader />
    }

    const store = configureStore({
      authProvider: () => Promise.resolve(),
      dataProvider,
      history,
    })

    return (
      <Auth0Provider
        domain={auth0Config.domain}
        client_id={auth0Config.domain}
        redirect_uri={window.location.origin}
        onRedirectCallback={appState => {
          history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
        }}
      >
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
      </Auth0Provider>
    )
  }
}

export default App
