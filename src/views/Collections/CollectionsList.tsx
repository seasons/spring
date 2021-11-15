import React from "react"
import { Datagrid, DateField, List, TextField } from "@seasons/react-admin"
import { ViewEntityField } from "fields"
import { Header, Indicator } from "components"
import { useHistory } from "react-router-dom"
import { Box, Typography } from "@material-ui/core"

export const CollectionsList = props => {
  const history = useHistory()

  return (
    <Box px={2}>
      <Header
        title="Collections"
        primaryButton={{
          text: "New Collection",
          action: () => history.push("/content/collections/create"),
        }}
        breadcrumbs={[
          {
            title: "Content",
            url: "/content",
          },
          {
            title: "Collections",
            url: "/content/collections",
          },
        ]}
      />
      <List
        {...props}
        exporter={false}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource="Collection"
        title="Collections"
      >
        <Datagrid>
          <TextField source="title" label="Title" />
          <DateField source="createdAt" label="CreatedAt" />
          <DateField source="updatedAt" label="UpdatedAt" />
          <PublishedField label="Published" />
          <FeaturedField label="Featured" />
          <LocationsField label="Placements" />
          <ViewEntityField source="id" entityPath="content/collections" label="Actions" />
        </Datagrid>
      </List>
    </Box>
  )
}

const FeaturedField: React.FC<{ label: string; record?: any }> = ({ label, record }) => {
  if (!record) {
    return null
  }
  return <Indicator status={record.featured ? "True" : "False"} />
}

const PublishedField: React.FC<{ label: string; record?: any }> = ({ label, record }) => {
  if (!record) {
    return null
  }
  return <Indicator status={record.published ? "True" : "False"} />
}

const LocationsField: React.FC<{ label: string; record?: any }> = ({ label, record }) => {
  if (!record) {
    return null
  }
  return (
    <>
      {record?.placements.map(l => {
        return (
          <Typography variant="body1" color="textPrimary" key={l}>
            {l}
          </Typography>
        )
      })}
    </>
  )
}
