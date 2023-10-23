import React from "react";
import Logo from "./Logo";
import SideBraRoutes from "./SideBraRoutes";

const LeftsideBar = () => {
  return (
    <div className="hidden md:flex fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72">
      <div className="sticky top-0 z-40 w-full bg-gray-0/10  pb-5 pt-5 dark:bg-gray-100/5  2xl:pt-6">
        <div className="flex items-center justify-center mt-5">
          <Logo />
        </div>
        <div className="flex flex-col mt-20">
          <SideBraRoutes />
        </div>
      </div>
    </div>
  );
};

export default LeftsideBar;
