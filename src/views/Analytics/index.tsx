import { Container, Grid } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { NewProjects } from "./NewProjects"
import { RealTimeChart } from "./RealTimeChart"
import { RoiPerCustomer } from "./RoiPerCustomer"
import { SystemHealth } from "./SystemHealth"
import { TodaysMoney } from "./TodaysMoney"

const ContainerStyled = styled(Container)`
  margin-top: 10vh;
  padding-left: 64;
  padding-right: 64;
`

export interface AnalyticsViewProps {}

export const AnalyticsView: React.FC<AnalyticsViewProps> = () => {
  return (
    <ContainerStyled maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <TodaysMoney />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <NewProjects />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <SystemHealth />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <RoiPerCustomer />
        </Grid>
        <Grid item lg={3} xs={12}>
          <RealTimeChart />
        </Grid>
        {/* <Grid item lg={9} xs={12}>
          <PerformanceOverTime />
        </Grid>
        <Grid item lg={5} xl={4} xs={12}>
          <TeamTasks />
        </Grid>
        <Grid item lg={7} xl={8} xs={12}>
          <LatestProjects />
        </Grid> */}
      </Grid>
    </ContainerStyled>
  )
}
