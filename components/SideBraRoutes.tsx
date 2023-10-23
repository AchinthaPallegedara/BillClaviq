"use client";

import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import SidebraItem from "./SidebraItem";

const SideBraRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      {sidebarLinks.map((route) => (
        <SidebraItem
          key={route.href}
          icon={route.icon}
          lable={route.lable}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SideBraRoutes;
