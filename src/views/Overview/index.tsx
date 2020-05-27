import { Container, Grid } from "@material-ui/core"
import React from "react"
import { HistogramChart } from "./HistogramChart"
import { LatestProjects } from "./LatestProjects"
import { NewProjects } from "./NewProjects"
import { RealTimeChart } from "./RealTimeChart"
import { RoiPerCustomer } from "./RoiPerCustomer"
import { SystemHealth } from "./SystemHealth"
import { TeamTasks } from "./TeamTasks"
import { TodaysMoney } from "./TodaysMoney"
import { Header } from "components"

export interface OverviewViewProps {}

export const OverviewView: React.FC<OverviewViewProps> = () => {
  return (
    <Container maxWidth={false}>
      <Header
        title="Overview"
        breadcrumbs={[
          {
            title: "Overview",
            url: "/Overview",
          },
        ]}
      />
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
        <Grid item lg={9} xs={12}>
          <HistogramChart />
        </Grid>
        <Grid item lg={5} xl={4} xs={12}>
          <TeamTasks />
        </Grid>
        <Grid item lg={7} xl={8} xs={12}>
          <LatestProjects />
        </Grid>
      </Grid>
    </Container>
  )
}
