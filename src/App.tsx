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
import { client } from "./apollo"

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

    if (!isAuthenticated && window.location?.pathname !== "/login") {
      window.location.href = "/login"
    }

    buildOpenCrudProvider({
      client,
      buildQuery: enhanceBuildQuery(buildQuery),
    } as any).then(dataProvider => this.setState({ dataProvider: convertLegacyDataProvider(dataProvider) }))
  }

  render() {
    const { dataProvider } = this.state

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
