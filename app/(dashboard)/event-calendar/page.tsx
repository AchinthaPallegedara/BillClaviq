import PageHeader from "@/components/Page-Header";
import ExportButton from "@/components/export-button";
import { Button } from "@/components/ui/button";
import { calanderPageHeader } from "@/constants";
import React from "react";

const page = () => {
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
