import {
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";


export const adminNavigationItems = [
  {
    title: "Drugs",
    link: "/drugs",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Suppliers",
    link: "#",
    icon: ChartBarIcon,
    priv_name: 0,
    children: [
      {
        title: "All Suppliers",
        link: "/suppliers",
        icon: UserIcon,
        priv_name: 0,
      },
      {
        title: "Pending Suppliers",
        link: "/pending-suppliers",
        icon: UserIcon,
        priv_name: 0,
      },
    ],
  },
  {
    title: "Supplier Orders",
    link: "/all-supplier-orders",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Facility",
    link: "/facility",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Tenders",
    link: "/tenders",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Pharmacy Orders",
    link: "/pharmacy-orders",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
];

export const pharmacyNavigationItems = [
  {
    title: "Pharmacy Stocks",
    link: "/stocks",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Pharmacy Orders",
    link: "/orders",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
];

export const manufacturingNavigationItems = [
  {
    title: "Drugs",
    link: "/drugs",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
];

export const warehouseNavigationItems = [
  {
    title: "Drugs",
    link: "/drugs",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
  {
    title: "Suppliers",
    link: "#",
    icon: ChartBarIcon,
    priv_name: 0,
    children: [
      {
        title: "All Suppliers",
        link: "/suppliers",
        icon: UserIcon,
        priv_name: 0,
      },
      {
        title: "Pending Suppliers",
        link: "/pending-suppliers",
        icon: UserIcon,
        priv_name: 0,
      },
    ],
  },
  {
    title: "Supplier Orders",
    link: "/all-supplier-orders",
    icon: UserIcon,
    priv_name: 0,
    children: "",
  },
];
