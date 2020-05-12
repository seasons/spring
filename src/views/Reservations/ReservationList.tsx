import React, { cloneElement, useMemo, useState } from "react"
import { Datagrid, DatagridBody, Filter, List, TextField } from "react-admin"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container, Chip, Tabs, Tab } from "@material-ui/core"
import { Header } from "components/Header"
import { TopToolbar, sanitizeListRestProps } from "react-admin"
import IconEvent from "@material-ui/icons/Event"
import { Spacer } from "components"
import { Field } from "fields/Field"

// const ListActions: React.FC<any> = ({
//   currentSort,
//   className,
//   resource,
//   filters,
//   displayedFilters,
//   exporter, // you can hide ExportButton if exporter = (null || false)
//   filterValues,
//   permanentFilter,
//   hasCreate, // you can hide CreateButton if hasCreate = false
//   basePath,
//   selectedIds,
//   onUnselectItems,
//   showFilter,
//   maxResults,
//   total,
//   ...rest
// }) => {
//   return (
//     <>
//       <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
//         <Spacer />
//         {filters &&
//           cloneElement(filters, {
//             resource,
//             showFilter,
//             displayedFilters,
//             filterValues,
//             context: "button",
//           })}
//       </TopToolbar>
//     </>
//   )
// }

const StatusInput = ({
  source,
  value,
  tabs,
  onChange,
}: {
  source: any
  value?: any
  tabs: any
  onChange?: (value: any) => void
}) => {
  const [currentTab, setCurrentTab] = useState("incoming")

  return (
    <Field
      name={source}
      render={({ input, meta }) => (
        <Tabs
          onChange={(e, newValue) => {
            setCurrentTab(newValue)
            input.onChange(newValue)
            onChange?.(newValue)
          }}
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          variant="standard"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
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
        { label: "All", value: [] },
        {
          label: "Inbound",
          value: ["InTransit"],
          // value: "inbound",
        },
        {
          label: "Outbound",
          value: ["New", "InQueue", "OnHold", "Packed", "Shipped", "InTransit"],
          // value: "outbound",
        },
        {
          label: "Completed",
          // value: "completed",
          value: ["Completed"],
        },
      ]}
      // onChange={status => {
      //   switch (status) {
      //     case "inbound":
      //       props.setFilter("status_in", ["InTransit"])
      //       break
      //     case "outbound":
      //       props.setFilter("status_in", ["New", "InQueue", "OnHold", "Packed", "Shipped", "InTransit"])
      //       break
      //   }
      // }}
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
