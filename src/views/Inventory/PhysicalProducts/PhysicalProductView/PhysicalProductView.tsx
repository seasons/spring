import React from "react"

import { DetailView } from "components/DetailView"
import { PhysicalProductDetailViewHeader } from "./header"
import { ManageView } from "../Components/ManageView"
import { ReservationHistoryView } from "../Components/ReservationHistoryView"

export interface PhysicalProductViewProps {
  match: any
}

export const PhysicalProductView: React.FC<PhysicalProductViewProps> = ({ match }) => {
  return (
    <DetailView
      match={match}
      resource={"PhysicalProduct"}
      //@ts-ignore
      renderHeader={({ data, toggleSnackbar }) => (
        <PhysicalProductDetailViewHeader data={data} toggleSnackbar={toggleSnackbar} />
      )}
      tabs={[
        {
          value: "manage",
          label: "Manage",
          //@ts-ignore
          render: ({ data, toggleSnackbar }) => <ManageView data={data} toggleSnackbar={toggleSnackbar} />,
        },
        {
          value: "history",
          label: "History",
          //@ts-ignore
          render: ({ data }) => <ReservationHistoryView data={data} />,
        },
      ]}
    />
  )
}
