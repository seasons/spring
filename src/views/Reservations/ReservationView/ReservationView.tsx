import React, { useState } from "react"

import { DetailView } from "components/DetailView"
import { ManageView } from "../Manage"
import { ReservationHeader } from "../ReservationHeader"
import { TrackingInfo } from "./Components/TrackingInfo"

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
          render: ({ data, adminKey, match, recordID }) => <ManageView match={match} data={data} />,
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
