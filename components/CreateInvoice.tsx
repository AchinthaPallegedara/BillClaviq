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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "react-hot-toast";

import { Textarea } from "@/components/ui/textarea";

import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormFooter from "./FormFooter";
import AddInvoiceItems from "./AddInvoiceItems";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { groups } from "@/constants";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { getUserById } from "@/lib/models/user.model";

type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  id?: string;
  record?: InvoiceFormTypes;
}

const invoiceItems = [{ item: "", description: "", quantity: 1, price: "" }];

const CreateInvoice = ({ id, record, className }: TeamSwitcherProps) => {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups[0].teams[0]
  );
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  let userId: string;
  if (user) {
    userId = user.id;
  } else {
    userId = "";
  }

  useEffect(() => {
    async function fetchCompanyInfo() {
      try {
        const data = await getUserById(userId);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCompanyInfo();
  }, [userId]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      fromName: "Claviq",
      fromAddress:
        "70/1, Pallegedara, Mahakandegama, Wellawa, Kurunegala, 60570, Sri Lanka",
      fromPhone: "No phone number",
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
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your name" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="text-muted-foreground ml-[-20px] text-[12px]">
                                User name
                              </SelectLabel>
                              <SelectItem value="free">
                                <span className="font-medium">
                                  {userInfo?.userName || "Loading..."}
                                </span>
                              </SelectItem>
                              <SelectLabel className="text-muted-foreground ml-[-20px] text-[12px]">
                                Company name
                              </SelectLabel>
                              <SelectItem value="pro">
                                <span className="font-medium">
                                  {userInfo?.companyName || "Loading..."}
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                        <Input
                          disabled
                          type="tel"
                          onInput={phoneMask}
                          {...field}
                          value={userInfo?.phoneNumber || "Loading..."}
                        />
                      </FormControl>
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
                        <Textarea
                          disabled
                          placeholder="Enter your address"
                          {...field}
                          value={userInfo?.address || "Loading..."}
                        />
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
                        <Dialog
                          open={showNewTeamDialog}
                          onOpenChange={setShowNewTeamDialog}
                        >
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Input
                                type="search"
                                placeholder={"Enter the name"}
                                value={selectedTeam.label}
                                role="combobox"
                                aria-expanded={open}
                                readOnly
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-[350px] p-0 ">
                              <Command>
                                <CommandList>
                                  <CommandInput placeholder="Search team..." />
                                  <CommandEmpty>
                                    No customer found.
                                  </CommandEmpty>
                                  {groups.map((group) => (
                                    <CommandGroup
                                      key={group.label}
                                      heading={group.label}
                                    >
                                      {group.teams.map((team) => (
                                        <CommandItem
                                          key={team.value}
                                          onSelect={() => {
                                            setSelectedTeam(team);
                                            setOpen(false);
                                          }}
                                          className="text-sm"
                                        >
                                          <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                              src={`https://avatar.vercel.sh/${team.value}.png`}
                                              alt={team.label}
                                              className="grayscale"
                                            />
                                            <AvatarFallback>SC</AvatarFallback>
                                          </Avatar>
                                          {team.label}
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              selectedTeam.value === team.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  ))}
                                </CommandList>
                                <CommandSeparator />
                                <CommandList>
                                  <CommandGroup>
                                    <DialogTrigger asChild>
                                      <CommandItem
                                        onSelect={() => {
                                          setOpen(false);
                                          setShowNewTeamDialog(true);
                                        }}
                                      >
                                        <PlusCircle className="mr-2 h-5 w-5" />
                                        Add customer
                                      </CommandItem>
                                    </DialogTrigger>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle> Add customer</DialogTitle>
                              <DialogDescription>
                                Add a new customer to the system.
                              </DialogDescription>
                            </DialogHeader>
                            <div>
                              <div className="space-y-4 py-2 pb-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Customer name</Label>
                                  <Input
                                    id="Cus_name"
                                    placeholder="Achintha Hirudika."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="plan">Company name</Label>
                                  <Input
                                    id="Com_name"
                                    placeholder="Claviq Inc."
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setShowNewTeamDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit">Continue</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
