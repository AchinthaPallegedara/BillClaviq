import CreateInvoice from "@/components/CreateInvoice";
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
        <Button className="w-full lg:w-auto  mt-4 lg:mt-0">
          <ArrowDownToLine className="me-1.5 h-[17px] w-[17px]" />
          Import
        </Button>
      </PageHeader>
      <CreateInvoice />
    </>
  );
};

export default page;
