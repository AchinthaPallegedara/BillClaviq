"use client";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface sidebraItemProps {
  icon: LucideIcon;
  lable: string;
  href: string;
}

const SidebraItem = ({ icon: Icon, lable, href }: sidebraItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20  ${
        isActive && " bg-orange-200 hover:bg-orange-300 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={`text-slate-500 ${isActive && "text-orange-500"}`}
        />
        {lable}
      </div>
      <div
        className={`ml-auto opacity-0 border-2 border-orange-500 h-full pt-12 transition-all ${
          isActive && "opacity-100"
        }`}
      />
    </button>
  );
};

export default SidebraItem;
