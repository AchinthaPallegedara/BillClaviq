import { lexend } from "@/utils/fonts";
import React from "react";
import Breadcrumb from "./ui/BreadcrumbItem";
import { cn } from "@/lib/utils";
export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

const PageHeader = ({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) => {
  return (
    <header
      className={cn(
        " mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between xs:-mt-2 lg:mb-7",
        className
      )}
    >
      <div>
        <h2
          className={`mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]  font-semibold text-gray-900  text-2xl dark:text-white 2xl:text-[26px] 4xl:text-3xl ${lexend.className}`}
        >
          {title}
        </h2>
        <Breadcrumb
          separator=""
          separatorVariant="circle"
          className="flex-wrap"
        >
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={item.name}
              {...(item?.href && { href: item?.href })}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
};

export default PageHeader;
