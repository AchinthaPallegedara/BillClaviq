import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutList, LogOut } from "lucide-react";
import Logo from "./Logo";
import SideBraRoutes from "./SideBraRoutes";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <LayoutList className="me-3 h-auto w-auto p-0 sm:me-4 xl:hidden " />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" w-[320px] dark:bg-gray-100/5 pl-0 pr-0 pb-0 pt-8"
      >
        <div className="sticky top-5 z-40 w-full bg-gray-0/10 h-full pb-5 pt-5   2xl:pt-6 flex flex-col justify-between ">
          <div className="flex flex-col">
            <div className="flex ml-4">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
