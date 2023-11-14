import PageHeader from "@/components/Page-Header";
import { Button } from "@/components/ui/button";
import { customerAddPageHeader } from "@/constants";
import { ArrowDownToLine } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader
        title={customerAddPageHeader.title}
        breadcrumb={customerAddPageHeader.breadcrumb}
      >
        <Button className="w-full sm:w-auto  mt-4 sm:mt-0">
          <ArrowDownToLine className="me-1.5 h-[17px] w-[17px]" />
          Import
        </Button>
      </PageHeader>
    </>
  );
};

export default page;
