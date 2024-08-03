import PageHeader from "@/components/Page-Header";
import ExportButton from "@/components/export-button";
import { Button } from "@/components/ui/button";
import { calanderPageHeader } from "@/constants";
import { checkIsNewUser } from "@/lib/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) return null;
  if (await checkIsNewUser(userId)) {
    return redirect("/settings");
  }
  return (
    <>
      <PageHeader
        title={calanderPageHeader.title}
        breadcrumb={calanderPageHeader.breadcrumb}
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
          data={eventData}
          fileName="event_data"
          header="ID,Title,Description,Location,Start,end"
        /> */}
          <Button className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100">
            Create Event
          </Button>
        </div>
      </PageHeader>
      {/* <EventCalendarView /> */}
    </>
  );
};

export default page;
