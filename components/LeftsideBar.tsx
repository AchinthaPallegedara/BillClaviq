import React from "react";
import Logo from "./Logo";
import SideBraRoutes from "./SideBraRoutes";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const LeftsideBar = () => {
  return (
    <div className="hidden xl:flex fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-black 2xl:w-72 dark:border-zinc-800">
      <div className="sticky top-0 z-40 w-full bg-gray-0/10  pb-5 pt-5 dark:bg-gray-100/5  2xl:pt-6 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex ml-4 mt-5">
            <Logo />
          </div>

          <div className="flex flex-col mt-20">
            <SideBraRoutes />
          </div>
        </div>

        <div className="flex flex-col m-2 gap-3">
          <SignOutButton>
            <Button>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default LeftsideBar;
