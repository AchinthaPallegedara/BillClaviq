"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportToCSV } from "@/utils/export-to-csv";
import { ArrowUpFromLine } from "lucide-react";

type ExportButtonProps = {
  data: unknown[];
  header: string;
  fileName: string;
  className?: string;
};

export default function ExportButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={() => exportToCSV(data, header, fileName)}
      className={cn("w-full @lg:w-auto mt-4 sm:mt-0", className)}
    >
      <ArrowUpFromLine className="me-1.5 h-[17px] w-[17px]  " />
      Export
    </Button>
  );
}
