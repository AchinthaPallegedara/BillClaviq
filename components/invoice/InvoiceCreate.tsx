"use client";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import InvoiceStyle1 from "./InvoiceStyle1";
import { Button } from "../ui/button";

const InvoiceCreate = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col space-y-10">
      <div className=" border border-slate-200 shadow-md shadow-slate-200">
        <div ref={targetRef}>
          <InvoiceStyle1 />
        </div>
      </div>
      <Button
        className=" bg-slate-200 text-slate-900"
        onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
      >
        Download PDF
      </Button>
    </div>
  );
};

export default InvoiceCreate;
