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
        title: "Sales",
        href: "/sales",
        icon: BarChartIcon,
        open: false,
        items: [
          {
            title: "Reactivations",
            href: "/sales/reactivations",
          },
          ...["Jan"].map(a => ({
            title: `${a} 21`,
            href: `/sales/${a.toLowerCase()}21`,
          })),
          ...["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan"].map(a => ({
            title: `${a} 20`,
            href: `/sales/${a.toLowerCase()}20`,
          })),
          ...["Dec", "Nov"].map(a => ({
            title: `${a} 19`,
            href: `/sales/${a.toLowerCase()}19`,
          })),
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
        title: "Content",
        href: "/content/community",
        icon: ListIcon,
        items: [
          {
            title: "Community",
            href: "/content/community",
          },
          {
            title: "Collections",
            href: "/content/collections",
          },
        ],
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
