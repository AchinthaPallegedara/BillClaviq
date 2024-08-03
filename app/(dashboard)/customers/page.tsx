import PageHeader from "@/components/Page-Header";
import ExportButton from "@/components/export-button";
import { Button } from "@/components/ui/button";
import { customersPageHeader } from "@/constants";

import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getCustomers } from "@/lib/models/customer.model";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { checkIsNewUser } from "@/lib/models/user.model";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) return null;
  if (await checkIsNewUser(userId)) {
    return redirect("/settings");
  }
  const user = await currentUser();
  if (!user) {
    return <div>Please sign in</div>;
  }
  const data = await getCustomers(user?.id);

  return (
    <>
      <PageHeader
        title={customersPageHeader.title}
        breadcrumb={customersPageHeader.breadcrumb}
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={customerData}
            fileName="invoice_data"
            header="Id,Name,Company,Email,Phone Number,Address,Avatar,CreatedAt"
          /> */}
          <Link
            href={"/customers/add-new"}
            className="w-full sm:w-auto  mt-4 sm:mt-0"
          >
            <Button className="w-full sm:w-auto   sm:mt-0">
              <UserPlus className="me-1.5 h-[17px] w-[17px]" />
              Add Customer
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
