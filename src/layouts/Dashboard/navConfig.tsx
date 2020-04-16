import BarChartIcon from "@material-ui/icons/BarChart"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import ListIcon from "@material-ui/icons/List"
import PersonIcon from "@material-ui/icons/PersonOutlined"

export default [
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
    href: "/inventory/products",
    icon: DashboardIcon,
  },
  {
    title: "Reservations",
    href: "/reservations",
    icon: ListIcon,
  },
]
