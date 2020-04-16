import React, { Suspense, useState } from "react"
import { renderRoutes } from "react-router-config"
import { LinearProgress } from "@material-ui/core"
import NavBar from "./NavBar"
import styled from "styled-components"
import { colors } from "theme"

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
  background: ${colors.white100};

  ${theme.breakpoints.up("lg")} {
    margin-left: 256px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
`}
`

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({ route }: any) => {
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false)

  return (
    <>
      <NavBar onMobileClose={() => setOpenNavBarMobile(false)} openMobile={openNavBarMobile} />
      <Container>
        <Content>
          <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
        </Content>
      </Container>
    </>
  )
}
