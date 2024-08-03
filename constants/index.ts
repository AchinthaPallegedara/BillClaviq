import {
  Building2,
  CalendarDays,
  Layout,
  Receipt,
  Settings,
  Users,
} from "lucide-react";

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
    icon: CalendarDays,
    lable: "Event Calendar",
    href: "/event-calendar",
  },

  {
    icon: Settings,
    lable: "Settings",
    href: "/settings",
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

export const calanderPageHeader = {
  title: "Event Calendar",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/event-calendar",
      name: "Event Calendar",
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
