import BarChartIcon from "@material-ui/icons/BarChart"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import ListIcon from "@material-ui/icons/List"
import PersonIcon from "@material-ui/icons/PersonOutlined"
import PeopleIcon from "@material-ui/icons/PeopleOutlined"
import ArchiveIcon from "@material-ui/icons/Archive"

export default [
  {
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
        items: [
          {
            title: "Inventory Health",
            href: "/analytics/inventory-health",
          },
          {
            title: "Inventory Health Detail",
            href: "/analytics/inventory-health/detail",
          },
        ],
      },
      {
        title: "Members",
        href: "/members",
        icon: PersonIcon,
      },
      {
        title: "Reservations",
        href: "/reservations",
        icon: ArchiveIcon,
      },
      {
        title: "Inventory",
        href: "/inventory/products",
        icon: ListIcon,
        items: [
          {
            title: "Products",
            href: "/inventory/products",
          },
          {
            title: "Brands",
            href: "/inventory/brands",
          },
          {
            title: "Categories",
            href: "/inventory/categories",
          },
          {
            title: "Physical Products",
            href: "/inventory/physical-products",
          },
        ],
      },
      {
        title: "Community",
        href: "/community",
        icon: PeopleIcon,
      },
    ],
  },
  {
    items: [
      {
        title: "Notifications",
        href: "/notifications",
      },
    ],
  },
]
