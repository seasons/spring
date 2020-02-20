import TopBar from "./TopBar"
import React from "react"
import { Layout } from "react-admin"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = props => {
  return <Layout {...props} appBar={TopBar} />
}
