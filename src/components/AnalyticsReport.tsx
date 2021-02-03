import React, { useState, useEffect } from "react"

import { useMutation } from "react-apollo"
import { SnackbarState } from "components/Snackbar"
import { Snackbar, Header } from "components"
import { Container, makeStyles, Theme, colors } from "@material-ui/core"
import Iframe from "react-iframe"
import { Loading } from "@seasons/react-admin"
import { CREATE_EMBED_URL } from "./mutations"
import { ViewType } from "generated/globalTypes"

export interface AnalyticsReportProps {
  title: string
  url: string
  // The view type of the report we wish to embed
  type: ViewType
  // The index of the report we wish to embed
  index: number
}

const useStyles = makeStyles<Theme>(theme => ({
  iframe: {
    border: `1px solid ${colors.grey[300]}`,
  },
}))

export const AnalyticsReport: React.FC<AnalyticsReportProps> = ({ title, url, type, index }) => {
  const [embedURL, setEmbedURL] = useState("")
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const [createEmbedURL] = useMutation(CREATE_EMBED_URL, {
    onCompleted: data => {
      setEmbedURL(data.createEmbedURL)
      console.log(data)
    },
    onError: error => {
      console.log(error)
      toggleSnackbar({
        show: true,
        message: `Unable to render report. Please contact the tech team.`,
        status: "error",
      })
    },
  })
  useEffect(() => {
    createEmbedURL({ variables: { input: { type, index } } })
  }, [index, type, createEmbedURL])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Container maxWidth={false} style={{ height: "85%" }}>
        <Iframe
          url={embedURL}
          width="100%"
          height="100%"
          className={classes.iframe}
          onLoad={() => {
            setLoading(false) //
          }}
        />
        <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
      </Container>
    </>
  )
}
