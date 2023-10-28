"use client";

import {
  FormBlockWrapper,
  InvoiceFormTypes,
  invoiceFormSchema,
  statusOptions,
} from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormFooter from "./FormFooter";
import AddInvoiceItems from "./AddInvoiceItems";

const invoiceItems = [{ item: "", description: "", quantity: 1, price: "" }];

const CreateInvoice = ({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormTypes;
}) => {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      fromName: "Claviq",
      fromAddress:
        "70/1, Pallegedara, Mahakandegama, Wellawa, Kurunegala, 60570, Sri Lanka",
      fromPhone: "+94 76 55 63 418",
      toName: "",
      toAddress: "",
      toPhone: "",
      shipping: "",
      discount: "",
      taxes: "",
      invoiceNumber: "INV-0071",
      createDate: new Date(),
      status: "draft",
      dueDate: new Date(),
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<InvoiceFormTypes> = (data) => {
    toast.success(<p>Invoice successfully {id ? "updated" : "created"}</p>);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("createInvoice data ->", data);
      setReset({
        fromName: "",
        fromAddress: "",
        fromPhone: "",
        toName: "",
        toAddress: "",
        toPhone: "",
        shipping: "0",
        discount: "0",
        taxes: "0",
        createDate: new Date(),
        status: "draft",
        items: invoiceItems,
      });
    }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
        ...item,
      }))
    : invoiceItems;

  const phoneMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    let formattedNum = "";
    let isPlus = false;
    let digitCount = 0;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === "+") {
        isPlus = true;
        formattedNum = "+";
        digitCount = 0;
      } else if (/[0-9]/.test(char)) {
        formattedNum += char;
        digitCount++;

        if (isPlus) {
          if (
            digitCount === 2 ||
            digitCount === 4 ||
            digitCount === 6 ||
            digitCount === 8
          ) {
            formattedNum += " ";
          }
        } else {
          if (digitCount === 2 || digitCount === 4 || digitCount === 6) {
            formattedNum += " ";
          }
        }
      }
    }

    event.target.value = formattedNum;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-grow flex-col container [&_label]:font-medium"
      >
        <div className="flex-grow pb-10">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 2xl:gap-10 3xl:gap-12">
            <FormBlockWrapper
              title={"From:"}
              description={"From he who sending this invoice"}
            >
              <FormField
                control={form.control}
                name="fromName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="fromPhone"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" onInput={phoneMask} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="fromAddress"
                render={({ field }) => (
                  <>
                    <FormItem className="col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your address" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </FormBlockWrapper>
            <FormBlockWrapper
              title={"To:"}
              description={"To he who will receive this invoice"}
              className="pt-7 2xl:pt-9 3xl:pt-11"
            >
              <FormField
                control={form.control}
                name="toName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="toPhone"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          onInput={phoneMask}
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="toAddress"
                render={({ field }) => (
                  <>
                    <FormItem className="col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your address" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </FormBlockWrapper>
            <FormBlockWrapper
              title={"Schedule:"}
              description={"To he who will receive this invoice"}
              className="pt-7 2xl:pt-9 3xl:pt-11 "
            >
              <div className="col-span-2">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Invoice Number</FormLabel>
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <div className="w-full  ">
                    <FormField
                      control={form.control}
                      name="createDate"
                      render={({ field }) => (
                        <>
                          <FormItem className="w-full max-lg:flex max-lg:flex-col max-lg:mt-2.5">
                            <FormLabel>Date Create </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      " text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {/* <CalendarIcon className="mr-2 h-4 w-full opacity-50" /> */}
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date("2200-01-01") ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                  <div className="w-full ">
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <>
                          <FormItem className="w-full max-lg:flex max-lg:flex-col max-lg:mt-2.5">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      " text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {/* <CalendarIcon className="mr-2 h-4 w-full opacity-50 " /> */}
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date("2200-01-01") ||
                                    date < new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusOptions.map((route) => (
                              <SelectItem key={route.value} value={route.value}>
                                {route.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </FormBlockWrapper>
            <AddInvoiceItems />
          </div>
        </div>
        <FormFooter submitBtnText={id ? "Update Invoice" : "Create Invoice"} />
      </form>
    </Form>
  );
};

export default CreateInvoice;
