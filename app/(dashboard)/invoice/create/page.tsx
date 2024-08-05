import InvoiceCreate from "@/components/invoice/InvoiceCreate";
import InvoiceStyle1 from "@/components/invoice/InvoiceStyle1";
import PageHeader from "@/components/Page-Header";
import { Button } from "@/components/ui/button";
import { invoicePageHeader } from "@/constants";
import { ArrowDownToLine } from "lucide-react";

const page = () => {
  return (
    <>
      <PageHeader
        title={invoicePageHeader.title}
        breadcrumb={invoicePageHeader.breadcrumb}
      >
        <Button className="w-full sm:w-auto  mt-4 sm:mt-0">
          <ArrowDownToLine className="me-1.5 h-[17px] w-[17px]" />
          Import
        </Button>
      </PageHeader>
      <div className="flex items-center justify-center w-full">
        <InvoiceCreate />
      </div>
    </>
  );
};

export default page;
