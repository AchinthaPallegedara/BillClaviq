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
    href: "/layout",
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
