import { Building2, FilePlus2, Layout, List } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Layout,
    lable: "Dashboard",
    href: "/",
  },
  {
    icon: List,
    lable: "List",
    href: "/list",
  },
  {
    icon: FilePlus2,
    lable: "Create",
    href: "/create",
  },
  {
    icon: Building2,
    lable: "Business",
    href: "/business",
  },
];

export const invoicePageHeader = {
  title: "Create Invoice",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/list",
      name: "Invoice",
    },
    {
      name: "Create",
    },
  ],
};

export const groups = [
  {
    label: "Person",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Company",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
      {
        label: "Tech Solutions",
        value: "tech-solutions",
      },
      {
        label: "Galactic Innovators",
        value: "galactic-innovators",
      },
      {
        label: "Creative Minds",
        value: "creative-minds",
      },
      {
        label: "Alpha Developers",
        value: "alpha-developers",
      },
      {
        label: "Solar Explorers",
        value: "solar-explorers",
      },
      {
        label: "Digital Pioneers",
        value: "digital-pioneers",
      },
      {
        label: "Infinite Horizons",
        value: "infinite-horizons",
      },
      {
        label: "Data Wizards",
        value: "data-wizards",
      },
    ],
  },
];
