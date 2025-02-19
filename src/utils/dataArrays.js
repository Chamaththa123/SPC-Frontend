import {
  UserIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  ArchiveBoxXMarkIcon,
  UsersIcon,
  ArrowLeftCircleIcon,
  WrenchIcon,
  CreditCardIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const CustomerArray = [
  {
    title: "Add Customers",
    link: "add-customers",
    priv_name: "Customer_Management",
    icon: UserIcon,
  },
  {
    title: "List Customers",
    link: "list-customers",
    priv_name: "Customer_Management",
    icon: UserIcon,
  },
  {
    title: "Customer Credit Logs",
    link: "customer-credit-logs",
    priv_name: "Customer_Credit_Logs",
    icon: BookOpenIcon,
  },
  {
    title: "Customer Returns",
    link: "customer-returns",
    priv_name: "Customer_Returns",
    icon: ArchiveBoxXMarkIcon,
  },
];

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
    title: "Stocks",
    link: "/stocks",
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
