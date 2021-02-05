import { Container, Grid, Typography } from "@material-ui/core"
import React from "react"
import { HistogramChart } from "./HistogramChart"
import { LatestSignups } from "./LatestSignups"
import { NumberWidget } from "./NumberWidget"
import { RealTimeChart } from "./RealTimeChart"
import { TeamTasks } from "./TeamTasks"
import { MoneyWidget } from "./MoneyWidget"
import { Header } from "components"
import { gql } from "apollo-boost"
import { Loading } from "@seasons/react-admin"
import { useQuery } from "react-apollo"

import PeopleIcon from "@material-ui/icons/People"
import GroupAddIcon from "@material-ui/icons/GroupAdd"
import { Box } from "@material-ui/core"

export interface OverviewViewProps {}

const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard(id: "global") {
      id
      name
      elements {
        id
        type
        slug
        title
        view
        result
      }
    }
  }
`

export const OverviewView: React.FC<OverviewViewProps> = () => {
  const { data, loading } = useQuery(GET_DASHBOARD, {
    pollInterval: 10000,
  })

  const elements = data?.dashboard?.elements || []

  const getElementForSlug = slug => elements.find(e => e.slug === slug)

  const defaultRender = elements =>
    elements.map(element => {
      switch (element.type) {
        case "Count":
          return (
            <Grid item lg={3} sm={6} xs={12}>
              <NumberWidget data={element} />
            </Grid>
          )
        case "Money":
          return (
            <Grid item lg={3} sm={6} xs={12}>
              <MoneyWidget data={element} />
            </Grid>
          )
        default:
          return null
      }
    })

  if (loading) {
    return <Loading />
  }

  return (
    <Container maxWidth={false}>
      <Box mt={6}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <NumberWidget data={getElementForSlug("active-subscribers")} icon={<PeopleIcon />} />
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <NumberWidget data={getElementForSlug("paused-members")} />
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <NumberWidget data={getElementForSlug("waitlisted-and-admissable-users")} icon={<GroupAddIcon />} />
          </Grid>
        </Grid>

        <Box mt={4} my={2} display="flex" alignItems="center" width="100%">
          <Typography variant="h3">Financials</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xs={12}>
            <MoneyWidget data={getElementForSlug("mrr-(dollar)")} />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <MoneyWidget data={getElementForSlug("arr-(dollar)")} />
          </Grid>
        </Grid>

        {/* <Grid container spacing={3}>
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
            <LatestSignups />
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  )
}
