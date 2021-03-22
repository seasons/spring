import { Container, Grid, Typography } from "@material-ui/core"
import React from "react"
import { NumberWidget } from "./NumberWidget"
import { MoneyWidget } from "./MoneyWidget"
import { gql } from "apollo-boost"
import { Loading } from "@seasons/react-admin"
import { useQuery } from "react-apollo"
import { Spacer } from "components"

import PeopleIcon from "@material-ui/icons/People"
import GroupAddIcon from "@material-ui/icons/GroupAdd"
import { Box } from "@material-ui/core"
import { PiechartWidget } from "./PiechartWidget"
import { FunnelWidget } from "./FunnelWidget"
import { LinechartWidget } from "./LinechartWidget"
import { MapchartWidget } from "./MapchartWidget"

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

  if (loading) {
    return <Loading />
  }

  const getPercentageOfRefferingCustomersValue = data =>
    `${(parseFloat(data.result.percentage_of_customers_with_successful_referral) * 100).toFixed(2)}%`
  const getAverageReferralsPerReferringCustomerValue = data =>
    `${parseFloat(data.result.average_referrals_per_referring_customers).toFixed(2)}`
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
          <Grid item lg={4} sm={6} xs={12}>
            <MapchartWidget />
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
        <Box mt={4} my={2} display="flex" alignItems="center" width="100%">
          <Typography variant="h3">Acquisition</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12}>
            <LinechartWidget
              data={{
                ...getElementForSlug("accounts-created-per-month"),
                title: "Accounts Created",
              }}
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <FunnelWidget
              data={{
                ...getElementForSlug("overall-acquisition-funnel"),
                subtitle: "Last 30 Days",
                title: "Acquisition",
              }}
            />
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <FunnelWidget
              data={{
                ...getElementForSlug("web-acquisition-funnel"),
                subtitle: "Last 30 Days",
                title: "Web Acquisition",
              }}
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <FunnelWidget
              data={{
                ...getElementForSlug("ios-acquisition-funnel"),
                subtitle: "Last 30 Days",
                title: "iOS Acquisition",
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4} my={2} display="flex" alignItems="center" width="100%">
          <Typography variant="h3">Virality</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <NumberWidget
              data={getElementForSlug("percentage-of-referring-customers")}
              icon={<GroupAddIcon />}
              getValue={getPercentageOfRefferingCustomersValue}
            />
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <NumberWidget
              data={getElementForSlug("avg-referrals-per-referring-customer")}
              icon={<GroupAddIcon />}
              getValue={getAverageReferralsPerReferringCustomerValue}
            />
          </Grid>
        </Grid>
        <Box mt={4} my={2} display="flex" alignItems="center" width="100%">
          <Typography variant="h3">Key Actions by Platform</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <PiechartWidget
              data={{ ...getElementForSlug("account-creations-by-platform"), subtitle: "Last 30 Days" }}
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <PiechartWidget data={{ ...getElementForSlug("reservations-by-platform"), subtitle: "Last 30 days" }} />
          </Grid>
        </Grid>
        <Spacer mb={2} />
      </Box>
    </Container>
  )
}
