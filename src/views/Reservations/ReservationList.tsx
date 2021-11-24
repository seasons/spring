import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { Box, Container, Grid, Tab, Tabs, Typography, Button } from "@material-ui/core"
import { Header, Separator } from "components"
import { useQuery } from "react-apollo"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { DateTime } from "luxon"
import { GET_INBOUND_RESERVATIONS, GET_OUTBOUND_RESERVATIONS } from "./queries"

type TabId = "outbound" | "inbound"
type TabLabel = "Outbound" | "Inbound"
interface TabTypes {
  id: TabId
  label: TabLabel
}

const formatDate = date => {
  const dateTime = DateTime.fromISO(date)
  const month = dateTime.monthShort
  const day = dateTime.day
  const time = dateTime.toLocaleString(DateTime.TIME_SIMPLE)
  return `${month} ${day}, ${time}`
}

const formatAddress = address => {
  return `${address.city}, ${address.state}`
}

export const ReservationList = ({ staticContext, ...props }) => {
  const tabs: TabTypes[] = [
    { id: "outbound", label: "Outbound" },
    { id: "inbound", label: "Inbound" },
  ]
  const [currentTab, setCurrentTab] = useState<TabId>(tabs[0].id)
  const isOutbound = currentTab === "outbound"
  const { data, loading } = useQuery(isOutbound ? GET_OUTBOUND_RESERVATIONS : GET_INBOUND_RESERVATIONS)

  if (loading) {
    return <Loading />
  }

  const customers = data?.[isOutbound ? "outboundReservations" : "inboundReservations"]?.map(x => x.customer)

  return (
    <Container maxWidth={false}>
      <Header
        title="Reservations"
        breadcrumbs={[
          {
            title: "Reservations",
            url: "/reservations",
          },
        ]}
      />
      <Tabs
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="standard"
        onChange={(e, key) => {
          const tab = tabs.find(tab => tab.id === key)
          if (tab) {
            setCurrentTab(tab.id)
          }
        }}
      >
        {tabs.map((tab, i) => (
          <Tab key={tab.id} value={tab.id} label={tab.label} style={{ textTransform: "none" }} fullWidth={false} />
        ))}
      </Tabs>
      <Wrapper mb={2}>
        <Box py={4} px={2}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="h6">Items to process</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Customer name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Created at</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Ship to</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">Total reservations</Typography>
            </Grid>
          </Grid>
        </Box>
        <Separator />
        {customers?.map(customer => {
          const count = customer.reservationPhysicalProducts.length
          const customerName = `${customer.user.firstName} ${customer.user.lastName}`
          const entityLink = `/members/${customer.id}/bag`
          const reservationCount = customer.reservations.length
          const oldestCreatedAt = customer.reservationPhysicalProducts.reduce((a, b) => {
            return a.createdAt > b.createdAt ? a.createdAt : b.createdAt
          })

          return (
            <Box key={customer.id}>
              <Box p={2}>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="h6">{count}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6">{customerName}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{formatDate(oldestCreatedAt)}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{formatAddress(customer.detail.shippingAddress)}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="h6">{reservationCount}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button component={RouterLink} size="small" to={entityLink} variant="contained" color="primary">
                        View bag
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Separator />
            </Box>
          )
        })}
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled(Box)`
  border: 1px solid #e5e5e5;
`
