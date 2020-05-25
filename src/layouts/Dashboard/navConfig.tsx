import BarChartIcon from "@material-ui/icons/BarChart"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import ListIcon from "@material-ui/icons/List"
import PersonIcon from "@material-ui/icons/PersonOutlined"
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
      },
      {
        title: "Members",
        href: "/members",
        icon: PersonIcon,
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
        ],
      },
      {
        title: "Reservations",
        href: "/reservations",
        icon: ArchiveIcon,
      },
    ],
  },
]
