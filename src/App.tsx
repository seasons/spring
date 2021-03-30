import DateFnsUtils from "@date-io/date-fns"
import { createBrowserHistory } from "history"
import polyglotI18nProvider from "ra-i18n-polyglot"
import React from "react"
import { convertLegacyDataProvider, DataProviderContext, Resource, TranslationProvider } from "@seasons/react-admin"
import { ApolloProvider } from "react-apollo"
import { Provider as StoreProvider } from "react-redux"
import { renderRoutes } from "react-router-config"
import { Router, Route } from "react-router-dom"
import { ThemeProvider as SCThemeProvider } from "styled-components"

import { ThemeProvider } from "@material-ui/core"
import { StylesProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { SearchProvider } from "components/Search/SearchProvider"
import englishMessages from "./i18n/en"

import routes from "./routes"
import configureStore from "./store/adminStore"
import { theme } from "./theme/theme"
import { buildProvider } from "dataProvider"
import { client } from "./apollo"
import { QueryParamProvider } from "use-query-params"
import { SnackbarProvider, Snackbar } from "components/Snackbar"

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

    buildProvider()
      .then(dataProvider => this.setState({ dataProvider: convertLegacyDataProvider(dataProvider) }))
      .catch(err => console.error(err))
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StylesProvider injectFirst>
                  <SearchProvider>
                    <SCThemeProvider theme={theme}>
                      <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                          <Resource name="Product" intent="registration" />
                          <Resource name="Collection" intent="registration" />
                          <Resource name="PhysicalProduct" intent="registration" />
                          <Resource name="FitPic" intent="registration" />
                          <Resource name="Customer" intent="registration" />
                          <Resource name="Category" intent="registration" />
                          <Resource name="Brand" intent="registration" />
                          <Resource name="Launch" intent="registration" />
                          <Resource name="User" intent="registration" />
                          <Resource name="Reservation" intent="registration" />
                          <Resource name="Size" intent="registration" />
                          <Resource name="Tag" intent="registration" />
                          <Resource name="PushNotificationReceipt" intent="registration" />
                          <Resource name="Order" intent="registration" />
                          <Router history={history}>
                            <QueryParamProvider ReactRouterRoute={Route}>{renderRoutes(routes)}</QueryParamProvider>
                          </Router>
                          <Snackbar />
                        </SnackbarProvider>
                      </ThemeProvider>
                    </SCThemeProvider>
                  </SearchProvider>
                </StylesProvider>
              </MuiPickersUtilsProvider>
            </ApolloProvider>
          </DataProviderContext.Provider>
        </StoreProvider>
      </TranslationProvider>
    )
  }
}

export default App
