import React from "react"
import { Header } from "components"

export const ReservationHeader = ({ data }) => {
  return (
    <>
      <Header
        title={`Reservation: ${data.reservationNumber}`}
        breadcrumbs={[
          {
            title: "Reservations",
            url: "/reservations",
          },
          {
            title: `Reservation: ${data.reservationNumber}`,
            url: `/reservations/${data.reservationNumber}`,
          },
        ]}
      />
    </>
  )
}
