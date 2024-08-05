import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

interface Props {
  description: string;
  rate: number;
  hours: number;
  amount: number;
}

const InvoiceItem = ({ description, rate, hours, amount }: Props) => {
  return (
    <div className="grid grid-cols-6 my-2">
      <div className="col-span-3">
        <p className="text-black text-sm font-normal">{description}</p>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <p className="text-black text-sm font-normal">{rate}/hr</p>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <p className="text-black text-sm font-normal">{hours}</p>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <p className="text-black text-sm font-normal">LKR.{amount}</p>
      </div>
    </div>
  );
};

const InvoiceStyle1 = () => {
  return (
    <div className="relative h-[70.7vw] w-[50vw] bg-white px-14">
      <div className="flex w-full items-start justify-between my-10">
        <h1 className="text-black text-[142px] font-bold leading-none ">
          Invoice
        </h1>
        <div className="flex flex-col items-end mt-8">
          <Image
            src={"/claviqIcon.svg"}
            alt="Claviq Logo"
            width={70}
            height={130}
          />
          <p className="text-black text-sm font-normal">16 June 2024</p>
          <p className="text-black text-sm font-bold">Invoice No. 12345</p>
        </div>
      </div>
      <Separator className="bg-black" />
      <div className="my-6">
        <p className="text-black text-sm font-bold">Billed to: </p>
        <div className="mt-2">
          <p className="text-black text-sm font-normal">Imani Olowe</p>
          <p className="text-black text-sm font-normal">+94 765563148</p>
          <p className="text-black text-sm font-normal">
            70/1, Pallegedara, Mahakandegama, Wellawa
          </p>
        </div>
      </div>
      <Separator className="bg-black" />
      <div className="mt-32" />
      <Separator className="bg-black" />
      <div className="grid grid-cols-6 my-2">
        <div className="col-span-3">
          <p className="text-black text-sm font-bold">Description</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="text-black text-sm font-bold">Rate</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="text-black text-sm font-bold">Hours</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="text-black text-sm font-bold">Amount</p>
        </div>
      </div>
      <Separator className="bg-black" />
      <InvoiceItem
        description="Web Development"
        rate={500}
        hours={10}
        amount={5000}
      />
      <Separator />
      <InvoiceItem
        description="Graphic Design"
        rate={500}
        hours={10}
        amount={5000}
      />
      <Separator />
      <InvoiceItem
        description="Web Development"
        rate={500}
        hours={10}
        amount={5000}
      />
      <Separator />
      <div className="w-full mt-8 space-y-3">
        <div className="grid grid-cols-2 w-[15vw] ml-auto">
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-bold">Subtotal</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-normal">LKR.15000</p>
          </div>
        </div>
        <div className="grid grid-cols-2 w-[15vw] ml-auto">
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-bold">Tax (0%)</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-normal">LKR.0</p>
          </div>
        </div>
        <Separator className="bg-black w-[15vw] ml-auto" />
        <div className="grid grid-cols-2 w-[15vw] ml-auto">
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-bold">Total</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-black text-sm font-normal">LKR.12000</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 w-full px-14">
        <Separator className="bg-black mt-10" />
        <div className="my-6 flex justify-between">
          <div>
            <p className="text-black text-sm font-bold">Payment Information:</p>
            <div className="mt-2">
              <p className="text-black text-sm font-normal">Imani Olowe</p>
              <p className="text-black text-sm font-normal">+94 765563148</p>
              <p className="text-black text-sm font-normal">
                70/1, Pallegedara, Mahakandegama, Wellawa
              </p>
            </div>
          </div>
          <div className="mr-10">
            <p className="text-black text-sm font-bold">Payment Information:</p>
            <div className="mt-2">
              <p className="text-black text-sm font-normal">Imani Olowe</p>
              <p className="text-black text-sm font-normal">+94 765563148</p>
              <p className="text-black text-sm font-normal">
                70/1, Pallegedara, Mahakandegama, Wellawa
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-black" />
      </div>
    </div>
  );
};

export default InvoiceStyle1;
