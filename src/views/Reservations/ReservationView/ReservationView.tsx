import React from "react"

import { DetailView } from "components/DetailView"
import { OverviewView } from "../Overview"
import { TrackingInfo } from "./Components/TrackingInfo"
import { ReservationHeader } from "../ReservationHeader/index"

export const ReservationView: React.FunctionComponent<{ match: any }> = ({ match }) => {
  return (
    <DetailView
      match={match}
      resource={"Reservation"}
      //@ts-ignore
      renderHeader={({ data }) => <ReservationHeader data={data} />}
      tabs={[
        {
          value: "manage",
          label: "Manage",
          //@ts-ignore
          render: ({ data, match }) => <OverviewView match={match} data={data} />,
        },
        {
          value: "transitEvents",
          label: "Transit History",
          //@ts-ignore
          render: ({ data }) => <TrackingInfo packageEvents={data.packageEvents} />,
        },
      ]}
    />
  )
}
