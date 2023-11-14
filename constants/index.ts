import { Building2, Layout, Receipt, Users } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Layout,
    lable: "Dashboard",
    href: "/",
  },
  {
    icon: Receipt,
    lable: "Invoice",
    href: "/invoice",
  },

  {
    icon: Users,
    lable: "Customers",
    href: "/customers",
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
      href: "/invoice",
      name: "Invoice",
    },
    {
      name: "Create",
    },
  ],
};

export const customersPageHeader = {
  title: "Customers List",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/customers",
      name: "Customers",
    },
    {
      name: "List",
    },
  ],
};

export const invoiceListPageHeader = {
  title: "Invoice List",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/invoice",
      name: "Invoice",
    },
    {
      name: "List",
    },
  ],
};

export const customerAddPageHeader = {
  title: "Add Customer",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/customers",
      name: "Customers",
    },
    {
      name: "Add",
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
