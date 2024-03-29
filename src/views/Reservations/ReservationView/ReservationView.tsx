import React from "react"

import { DetailView } from "components/DetailView"
import { OverviewView } from "../Overview"
import { TrackingInfo } from "../TrackingInfo/index"
import { ReservationHeader } from "../ReservationHeader/index"
import { AdminLogsView } from "components/AdminLogsView"
import { Container } from "@material-ui/core"

export const ReservationView: React.FunctionComponent<{ match: any }> = ({ match }) => {
  return (
    <Container maxWidth={false}>
      <DetailView
        match={match}
        resource={"Reservation"}
        //@ts-ignore
        renderHeader={({ data }) => <ReservationHeader data={data} />}
        tabs={[
          {
            value: "overview",
            label: "Overview",
            //@ts-ignore
            render: ({ data, match }) => <OverviewView match={match} data={data} />,
          },
          {
            value: "transitEvents",
            label: "Transit History",
            //@ts-ignore
            render: ({ data }) => <TrackingInfo packageEvents={data.packageEvents} />,
          },
          {
            value: "logs",
            label: "Admin Logs",
            //@ts-ignore
            render: ({ data }) => <AdminLogsView logs={data.adminLogs} />,
          },
        ]}
      />
    </Container>
  )
}
