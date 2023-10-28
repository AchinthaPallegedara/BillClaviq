"use client";

import React from "react";
import { FormBlockWrapper } from "./formUtils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";

const AddInvoiceItems = () => {
  const priceValue = 3;
  const quantityValue = 5;

  return (
    <FormBlockWrapper
      title={"Item Details:"}
      description={"Add one or multiple item"}
      className="pt-7 2xl:pt-9 3xl:pt-11"
    >
      <div className="col-span-2 ">
        <div className="mb-8 rounded-lg border border-gray-200  p-4 shadow md:p-5 xl:p-6">
          <div className=" grid grid-cols-3 gap-4 ">
            <div className="col-span-1 w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="text">Item</Label>
              <Input type="text" id="item" placeholder="Enter item name" />
            </div>
            <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
              <Label htmlFor="number">Quantity</Label>
              <Input type="number" id="quantity" placeholder="1" />
            </div>
            <div className="col-span-1 flex items-center w-full gap-4 max-w-sm mt-1 ">
              <div className="grid w-full max-w-sm items-center justify-between gap-1.5">
                <Label htmlFor="number">Price</Label>
                <Input
                  type="number"
                  prefix={"$"}
                  id="price"
                  placeholder="100"
                />
              </div>
              <div className="flex items-start text-sm mt-2">
                <p className="me-1 text-gray-500">Total:</p>
                <span className="font-medium">
                  ${priceValue * quantityValue}
                </span>
              </div>
            </div>
            <div className="col-span-3 w-full mt-4">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                className="h-20"
              />
            </div>
          </div>
          <Button
            variant="link"
            color="danger"
            className="flex -mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold text-red-500 justify-end"
          >
            <Trash2 className="me-1 h-[18px] w-[18px]" />
            Remove
          </Button>
        </div>
        {/* TODO: end of items components */}
        <div className="flex w-full flex-col items-start justify-between 4xl:flex-row 4xl:pt-6">
          <Button
            variant="secondary"
            className="-mt-2 mb-7 w-full 4xl:mb-0 4xl:mt-0 4xl:w-auto"
          >
            <Plus className="me-1.5 h-4 w-4" />
            Add Item
          </Button>
          <div className="grid  w-full gap-2 4xl:w-auto">
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5"></div>
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
                <Label htmlFor="number">Discount</Label>
                <Input type="number" id="quantity" placeholder="15" />
              </div>
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
                <Label htmlFor="number">Taxes</Label>
                <Input type="number" id="quantity" placeholder="50" />
              </div>
            </div>
            <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 xl:max-w-xs">
              <p className="flex items-center justify-between">
                Subtotal:{" "}
                <span className="font-medium text-gray-700">$ 50</span>
              </p>
              <p className="flex items-center justify-between">
                Discount:{" "}
                <span className="font-medium text-gray-700">$ 15</span>
              </p>
              <p className="flex items-center justify-between">
                Taxes: <span className="font-medium text-red">--</span>
              </p>
              <p className="flex items-center justify-between text-base font-semibold text-gray-900">
                Total: <span>$ 120</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormBlockWrapper>
  );
};

export default AddInvoiceItems;
