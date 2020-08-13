import { Header } from "components/Header"
import { SinceDateField, ImageField, ViewEntityField } from "fields"
import React, { useState } from "react"
import { Datagrid, List } from "@seasons/react-admin"

import { Container, Box, Button, colors } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { fitPic } from "generated/fitPic"
import { Indicator, Snackbar } from "components"
import { FitPicReportStatus, FitPicStatus } from "generated/globalTypes"

import { useRefresh } from "@seasons/react-admin"
import { useMutation } from "react-apollo"
import { UPDATE_FIT_PIC } from "./mutations"
import { get } from "lodash"
import { FitPicFilter } from "./CreateFitPicView/Components"
import { SnackbarState } from "components/Snackbar"

export const FitPicList: React.FC<{ history: any }> = props => {
  const refresh = useRefresh()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const [updateFitPic] = useMutation(UPDATE_FIT_PIC, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Fit pic published",
        status: "success",
      })
      refresh()
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  return (
    <Container maxWidth={false}>
      <Header
        title="Community"
        primaryButton={{ text: "Add Photo", action: () => props.history.push("/community/create") }}
        breadcrumbs={[
          {
            title: "Community",
            url: "/community",
          },
        ]}
      />
      <List
        {...props}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        sort={{ field: "createdAt", order: "DESC" }}
        filters={<FitPicFilter />}
        bulkActionButtons={[]}
      >
        <Datagrid>
          <ImageField source="image" label="Image" size="large" />
          <GeneralField source="author" label="Author" />
          <GeneralField source="location.city" label="City" />
          <GeneralField source="location.state" label="State" />
          <SinceDateField source="createdAt" label="Published At" />
          <StatusField label="Status" />
          <ReportsField label="Reports" />
          <ActionsField
            label="Actions"
            onPublish={(id: string) => updateFitPic({ variables: { id, data: { status: FitPicStatus.Published } } })}
          />
        </Datagrid>
      </List>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}

const GeneralField: React.FC<{ label: string; record?: fitPic; source: string }> = ({ label, record, source }) => (
  <div>{`${get(record, source)}`}</div>
)

const PublishButton: React.FC<{ onClick: () => void; record: fitPic }> = ({ onClick, record }) => (
  <Box component="span" mr={1}>
    <Button size="small" variant="contained" color="secondary" onClick={onClick}>
      Publish
    </Button>
  </Box>
)

const ActionsField: React.FC<{ label: string; onPublish: (id: string) => void; record?: fitPic }> = ({
  label,
  onPublish,
  record,
}) => (
  <>
    {record && record.status !== "Published" && <PublishButton onClick={() => onPublish(record.id)} record={record} />}
    <ViewEntityField entityPath="community/fit-pic" record={record} source="id" />
  </>
)

const ReportsField: React.FC<{ label: string; record?: fitPic }> = ({ label, record }) => {
  if (!record) {
    return null
  }

  const pendingReports = record.reports?.filter(report => report.status === FitPicReportStatus.Pending)
  if (pendingReports.length > 0) {
    return (
      <Box display="flex" alignItems="center" m="0 auto">
        <CloseIcon style={{ color: colors.red[500] }} />
      </Box>
    )
  } else {
    return null
  }
}

const StatusField: React.FC<{ label: string; record?: fitPic }> = ({ label, record }) => {
  if (!record) {
    return null
  }

  return (
    <>
      <Indicator status={record.status} />
      <Box ml={1} style={{ display: "inline-block" }}>
        {record.status}
      </Box>
    </>
  )
}
