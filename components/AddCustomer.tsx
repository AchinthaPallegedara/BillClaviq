"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { FormBlockWrapper } from "./formUtils";
import { Textarea } from "./ui/textarea";
import { createCustomer } from "@/lib/models/customer.model";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  companyName: z
    .string()
    // .min(2, {
    //   message: "Name must be at least 2 characters.",
    // })
    .optional(),
  customerAddress: z
    .string()
    // .min(5, {
    //   message: "Address must be at least 5 characters.",
    // })
    .optional(),
  customerPhone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  customerEmail: z
    .string()
    // .email({
    //   message: "Please enter a valid email.",
    // })
    .optional(),

  customerMoreInfo: z
    .string()
    // .min(10, {
    //   message: "More details must be at least 10 characters.",
    // })
    .optional(),
});

export function AddCustomer() {
  const router = useRouter();
  const { user } = useUser();
  let userId: string;
  if (user) {
    userId = user.id;
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      companyName: "",
      customerAddress: "",
      customerEmail: "",
      customerMoreInfo: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCustomer = await createCustomer({
        ...values,
        customerOfId: userId,
      });
      console.log("New customer created");

      router.push("/customers/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-grow flex-col container [&_label]:font-medium"
      >
        <div className="flex-grow pb-10">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 2xl:gap-10 3xl:gap-12">
            <FormBlockWrapper
              title={"Basic:"}
              description={"Basic information about the customer."}
            >
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Achintha Pallegedara" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Claviq" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormBlockWrapper>
            <FormBlockWrapper
              title={"Contact:"}
              description={"Contact information about the customer."}
              className="pt-7 2xl:pt-9 3xl:pt-11"
            >
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="076 5563418"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="hello@claviq.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="customerAddress"
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
              title={"More:"}
              description={"More information about the customer."}
              className="pt-7 2xl:pt-9 3xl:pt-11"
            >
              <FormField
                control={form.control}
                name="customerMoreInfo"
                render={({ field }) => (
                  <>
                    <FormItem className="col-span-2 ">
                      <FormLabel>More Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter more details about the customer"
                          {...field}
                          style={{ height: "150px" }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </FormBlockWrapper>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
