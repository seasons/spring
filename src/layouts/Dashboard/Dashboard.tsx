import React, { Suspense } from "react"
import { renderRoutes } from "react-router-config"
import { Error, DataProviderContext, Loading } from "@seasons/react-admin"
import styled from "styled-components"
import { colors } from "theme"

import { LinearProgress } from "@material-ui/core"

import { NavBar } from "./NavBar"
import { TopBar } from "./TopBar"

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.black100};
  display: flex;
`

const Content = styled.div`
  ${({ theme }) => `
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  background-color: rgb(252, 252, 252);

  ${theme.breakpoints.up("lg")} {
    margin-left: 256px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  ${theme.breakpoints.down("md")} {
    margin-top: 64px;
  }
`}
`

interface DashboardProps {
  route: any
}

export class Dashboard extends React.Component<DashboardProps> {
  state = { hasError: false, errorMessage: null, errorInfo: null, openMenu: false }

  constructor(props) {
    super(props)
    /**
     * Reset the error state upon navigation
     *
     * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
     */
    props.history.listen(() => {
      if (this.state.hasError) {
        this.setState({ hasError: false })
      }
    })
  }

  componentDidCatch(errorMessage, errorInfo) {
    this.setState({ hasError: true, errorMessage, errorInfo })
  }

  render() {
    const { route } = this.props
    const { hasError, errorMessage, errorInfo, openMenu } = this.state

    return (
      <DataProviderContext>
        {dataProvider => (
          <>
            <TopBar onMobileNavOpen={() => this.setState({ openMenu: true })} />
            <NavBar onMobileClose={() => this.setState({ openMenu: false })} openMobile={openMenu} />
            <Container>
              <Content>
                <Suspense fallback={<LinearProgress />}>
                  {hasError ? (
                    <Error title="Seasons" error={errorMessage} errorInfo={errorInfo} />
                  ) : dataProvider ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Loading />
                  )}
                </Suspense>
              </Content>
            </Container>
          </>
        )}
      </DataProviderContext>
    )
  }
}
