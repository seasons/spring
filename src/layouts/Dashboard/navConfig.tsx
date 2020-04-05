/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import BarChartIcon from "@material-ui/icons/BarChart"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import PersonIcon from "@material-ui/icons/PersonOutlined"
import ListIcon from "@material-ui/icons/List"

export default [
  {
    subheader: "Pages",
    items: [
      {
        title: "Overview",
        href: "/overview",
        icon: HomeIcon,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChartIcon,
      },
      {
        title: "Members",
        href: "/members",
        icon: PersonIcon,
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: DashboardIcon,
      },
      {
        title: "Reservations",
        href: "/reservations",
        icon: ListIcon,
      },
    ],
  },
]
