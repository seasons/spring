import React, { useState, useEffect } from "react"
import { Datagrid, Filter, List } from "react-admin"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container, Tabs, Tab } from "@material-ui/core"
import { Header } from "components/Header"
import { Field } from "fields/Field"

const StatusInput = ({
  source,
  value,
  tabs,
  onChange,
  alwaysOn,
}: {
  source: any
  value?: any
  tabs: any
  onChange?: (value: any) => void
  alwaysOn?: boolean
}) => {
  const [currentTab, setCurrentTab] = useState("all")

  useEffect(() => {
    onChange?.([])
  })

  return (
    <Field
      name={source}
      render={({ input, meta }) => (
        <Tabs
          onChange={(e, key) => {
            const tab = tabs.find(a => a.id === key)
            setCurrentTab(tab.id)
            const filters = tab.value
            input.onChange(filters)
            onChange?.(filters)
          }}
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          variant="standard"
        >
          {tabs.map((tab, i) => (
            <Tab key={tab.id} value={tab.id} label={tab.label} />
          ))}
        </Tabs>
      )}
    />
  )
}

const Filters = props => (
  <Filter {...props}>
    <StatusInput
      source="status_in"
      tabs={[
        { label: "All", id: "all", value: [] },
        {
          label: "Inbound",
          id: "inbound",
          value: ["InTransit", "Received"],
        },
        {
          label: "Outbound",
          id: "outbound",
          value: ["New", "InQueue", "OnHold", "Packed", "Shipped", "InTransit"],
        },
        {
          label: "Completed",
          id: "completed",
          value: ["Completed"],
        },
      ]}
      alwaysOn
    />
  </Filter>
)

export const ReservationList = ({ staticContext, ...props }) => {
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Header
          title="Reservations"
          breadcrumbs={[
            {
              title: "Reservations",
              url: "/reservations",
            },
          ]}
        />
        <List
          {...props}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          filters={<Filters />}
          // actions={<ListActions />}
          sort={{
            field: "createdAt",
            order: "DESC",
          }}
          resource="Reservation"
          title="Reservations"
        >
          <Datagrid>
            <SinceDateField source="createdAt" label="Created" />
            <ImagesField source="images" label="Images" />
            <StatusField label="Status" />
            <MemberField label="Member" />
            <SinceDateField source="returnAt" label="Return" />
            <ViewEntityField entityPath="reservation" source="id" label="Actions" />
          </Datagrid>
        </List>
      </Box>
    </Container>
  )
}
