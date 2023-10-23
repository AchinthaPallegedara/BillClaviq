import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4 ">
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-6  backdrop-blur-xl dark:bg-black md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10  ">
      <div className="flex w-full max-w-2xl items-center lg:hidden">
        <Menu className="me-3 h-auto w-auto p-0 sm:me-4 xl:hidden " />

        <Link href="/" className="me-4 w-9 shrink-0 lg:me-5 xl:hidden">
          <Image
            src="/billClaviq-icon.png"
            alt="Bill Claviq"
            width={100}
            height={56}
          />
        </Link>
      </div>
      <HeaderMenuRight />
    </header>
  );
};

export default Header;
