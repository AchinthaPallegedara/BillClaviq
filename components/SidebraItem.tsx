"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface sidebraItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebraItem = ({ icon: Icon, label, href }: sidebraItemProps) => {
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
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 dark:text-white",
        isActive &&
          "text-slate-700 bg-orange-200 hover:bg-orange-300 dark:bg-orange-400 dark:hover:bg-orange-500 "
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-white",
            isActive && "text-orange-500"
          )}
        />
        {label}
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
