"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import Link from "next/link";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z
    .string()
    // .min(2, {
    //   message: "Name must be at least 2 characters.",
    // })
    .optional(),
  address: z
    .string()
    // .min(5, {
    //   message: "Address must be at least 5 characters.",
    // })
    .optional(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  email: z
    .string()
    // .email({
    //   message: "Please enter a valid email.",
    // })
    .optional(),

  moreInfo: z
    .string()
    // .min(10, {
    //   message: "More details must be at least 10 characters.",
    // })
    .optional(),
});

export function AddCustomer() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  let userId: string;
  if (user) {
    userId = user.id;
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      address: "",
      email: "",
      moreInfo: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCustomer = await createCustomer({
        ...values,
        customerOfId: userId,
      });

      toast({
        className:
          "border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-500",
        title: "Yeah, Customer added successfully",
        description: "You can view the customer in the customer list.",
      });

      router.push("/customers/");
      router.refresh();
    } catch (error) {
      toast({
        className:
          "border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-500",
        title: "Uh oh! Something went wrong.",
        description: ` There was a problem with your request.`,
      });
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Customer Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Achintha Pallegedara" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
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
                name="phone"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>
                        Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
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
                name="email"
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
                name="address"
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
                name="moreInfo"
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

        <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-black md:px-5 lg:px-6 3xl:px-8 4xl:px-10 -mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10">
          <Link href="/customers/" className="w-full xl:w-auto">
            <Button variant="outline">Cancle</Button>
          </Link>
          <Button type="submit" className="w-full xl:w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
