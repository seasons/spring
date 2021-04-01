import React from "react"

import { DetailView } from "components/DetailView"
import { PhysicalProductDetailViewHeader } from "./header"
import { ManageView } from "../Components/ManageView"
import { ReservationHistoryView } from "../Components/ReservationHistoryView"
import { PhysicalProductQAView } from "./PhysicalProductQAEntries"
import { AdminLogsView } from "components/AdminLogsView"

export interface PhysicalProductViewProps {
  match: any
}

export const PhysicalProductView: React.FC<PhysicalProductViewProps> = ({ match }) => {
  return (
    <DetailView
      match={match}
      resource={"PhysicalProduct"}
      //@ts-ignore
      renderHeader={({ data }) => <PhysicalProductDetailViewHeader data={data} />}
      tabs={[
        {
          value: "manage",
          label: "Manage",
          //@ts-ignore
          render: ({ data }) => <ManageView data={data} />,
        },
        {
          value: "quality",
          label: "QA Entries",
          render: ({ data }) => <PhysicalProductQAView data={data} />,
        },
        {
          value: "history",
          label: "History",
          //@ts-ignore
          render: ({ data }) => <ReservationHistoryView data={data} />,
        },
        {
          value: "logs",
          label: "Admin Logs",
          render: ({ data }) => <AdminLogsView logs={data.adminLogs} />,
        },
      ]}
    />
  )
}
