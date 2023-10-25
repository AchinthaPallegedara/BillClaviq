import { lexend } from "@/utils/fonts";
import React from "react";

const PageHeader = () => {
  return (
    <header className=" mb-6 flex flex-col @lg:flex-row @lg:items-center @lg:justify-between xs:-mt-2 lg:mb-7">
      <div>
        <h2
          className={`mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]  font-semibold text-gray-900  text-2xl dark:text-gray-800 2xl:text-[26px] 4xl:text-3xl ${lexend.className}`}
        >
          Create Invoice
        </h2>
      </div>
    </header>
  );
};

export default PageHeader;
