/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react"
import { colors } from "@material-ui/core"
import BarChartIcon from "@material-ui/icons/BarChart"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import PersonIcon from "@material-ui/icons/PersonOutlined"
import ListIcon from "@material-ui/icons/List"
import Label from "../../Components/Label"

export default [
  {
    subheader: "Pages",
    items: [
      {
        title: "Brands",
        href: "/brands",
        icon: HomeIcon,
      },
      {
        title: "Products",
        href: "/products",
        icon: ListIcon,
      },
      {
        title: "Dashboards",
        href: "/dashboards",
        icon: DashboardIcon,
        items: [
          {
            title: "Default",
            href: "/dashboards/default",
          },
          {
            title: "Analytics",
            href: "/dashboards/analytics",
          },
        ],
      },
      {
        title: "Management",
        href: "/management",
        icon: BarChartIcon,
        items: [
          {
            title: "Customers",
            href: "/customers",
          },
          {
            title: "Customer Details",
            href: "/management/customers/1/summary",
          },
          {
            title: "Brands",
            href: "/management/brands",
          },
          {
            title: "Reservations",
            href: "/management/reservations",
          },
        ],
      },
      {
        title: "Profile",
        href: "/profile",
        icon: PersonIcon,
        items: [
          {
            title: "Timeline",
            href: "/profile/1/timeline",
          },
          {
            title: "Connections",
            href: "/profile/1/connections",
          },
          {
            title: "Projects",
            href: "/profile/1/projects",
          },
          {
            title: "Reviews",
            href: "/profile/1/reviews",
          },
        ],
      },
    ],
  },
]
